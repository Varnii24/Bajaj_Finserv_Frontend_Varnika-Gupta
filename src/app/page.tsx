"use client";

import {useEffect, useState, useCallback} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {PanelLeft, PanelRight} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";

interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: {name: string}[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
  video_consult: boolean;
  in_clinic: boolean;
}

const API_ENDPOINT = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialtyFilters, setSpecialtyFilters] = useState<string[]>([]);
  const [consultationMode, setConsultationMode] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedSpecialties, setExpandedSpecialties] = useState(false);

  // Fetch doctors data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Update filtered doctors whenever doctors data changes
  useEffect(() => {
    applyFilters();
  }, [doctors, specialtyFilters, consultationMode, sortOption, searchQuery]);

  // Function to apply filters
  const applyFilters = useCallback(() => {
    let filteredList = [...doctors];

    // Search filter (names + specialties)
    if (searchQuery) {
      filteredList = filteredList.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialities.some(spec => spec.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Specialty filter
    if (specialtyFilters.length > 0) {
      filteredList = filteredList.filter((doctor) =>
        doctor.specialities.some((specialty) => specialtyFilters.includes(specialty.name))
      );
    }

    // Consultation mode filter
    if (consultationMode === 'video') {
      filteredList = filteredList.filter((doctor) => doctor.video_consult);
    } else if (consultationMode === 'inClinic') {
      filteredList = filteredList.filter((doctor) => doctor.in_clinic);
    }

    // Sort filter
    if (sortOption === 'fees') {
      filteredList.sort((a, b) => parseFloat(a.fees) - parseFloat(b.fees));
    } else if (sortOption === 'experience') {
      filteredList.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }

    setFilteredDoctors(filteredList);
  }, [doctors, searchQuery, specialtyFilters, consultationMode, sortOption]);

  // Function to handle specialty filter change
  const handleSpecialtyFilterChange = (specialty: string) => {
    setSearchQuery(''); // Clear search query when applying specialty filter
    setSuggestions([]); // Clear suggestions when applying specialty filter
    if (specialtyFilters.includes(specialty)) {
      setSpecialtyFilters(specialtyFilters.filter((item) => item !== specialty));
    } else {
      setSpecialtyFilters([...specialtyFilters, specialty]);
    }
  };

  // Function to handle consultation mode filter change
  const handleConsultationModeChange = (mode: string) => {
    setConsultationMode(mode);
  };

  // Function to handle sort option change
  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
  };

  // Function to handle search query change
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);

    // Update suggestions based on search query
    if (query) {
      const newSuggestions = doctors
        .filter((doctor) => doctor.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
    setSpecialtyFilters([]);
  };

  const handleSuggestionClick = (doctorName: string) => {
    setSearchQuery(doctorName);
    setSuggestions([]);
    setSpecialtyFilters([]);
  };

  const specialties = [
    "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", "ENT",
    "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist",
    "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian-Nutritionist", "Psychologist",
    "Sexologist", "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSpecialtyFilters([]);
    setConsultationMode('');
    setSortOption('');
    setSuggestions([]);
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-primary p-4 w-full z-10 top-0 sticky flex items-center">
        <div className="text-white font-bold text-xl mr-4">VarClinic</div>
        <Input
          type="text"
          placeholder="Search doctor by name or speciality..."
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
          data-testid="autocomplete-input"
          className="flex-grow"
        />
        {suggestions.length > 0 && (
          <ul className="border rounded-md mt-1 bg-secondary absolute top-full left-4 w-[calc(100%-8px)]">
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                className="p-2 hover:bg-accent cursor-pointer"
                onClick={() => handleSuggestionClick(doctor.name)}
                data-testid="suggestion-item"
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={cn(
            "bg-[#a8c2ed] text-black transition-width duration-300 overflow-hidden",
            isSidebarOpen ? "w-64 p-4 border-r" : "w-12 p-2"
          )}
          style={{zIndex: 2}}
        >
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className="absolute top-2 left-2"
          >
            {isSidebarOpen ? <PanelLeft/> : <PanelRight/>}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

          {isSidebarOpen && (
            <ScrollArea className="h-[calc(100vh-150px)] w-full pr-2">
              {/* Specialty Filter */}
              <Accordion type="single" collapsible>
                <AccordionItem value="specialties">
                  <AccordionTrigger data-testid="filter-header-speciality" className="font-semibold mb-2">
                    Speciality
                  </AccordionTrigger>
                  <AccordionContent>
                    {specialties.map((specialty) => (
                      <div key={specialty} className="pl-4">
                        <label htmlFor={`specialty-${specialty}`} className="flex items-center">
                          <Checkbox
                            id={`specialty-${specialty}`}
                            checked={specialtyFilters.includes(specialty)}
                            onCheckedChange={() => handleSpecialtyFilterChange(specialty)}
                            data-testid={`filter-specialty-${specialty.replace(' ', '-')}`}
                          />
                          <span className="ml-2">{specialty}</span>
                        </label>
                      </div>
                    ))}
                    <Button variant="link" size="sm" onClick={() => setExpandedSpecialties(!expandedSpecialties)}>
                      {expandedSpecialties ? "Show Less" : "Show More"}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Consultation Mode Filter */}
              <div data-testid="filter-header-moc" className="font-semibold mt-4 mb-2">
                Consultation Mode
              </div>
              <Select onValueChange={handleConsultationModeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Consult</SelectItem>
                  <SelectItem value="inClinic">In Clinic</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <div data-testid="filter-header-sort" className="font-semibold mt-4 mb-2">
                Sort
              </div>
              <Select onValueChange={handleSortOptionChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fees">Fees</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                </SelectContent>
              </Select>

              {/* Reset Button */}
              <Button variant="secondary" className="mt-4" onClick={resetFilters}>
                Reset
              </Button>
            </ScrollArea>
          )}
        </div>

        {/* Doctor Listing */}
        <div className={cn(
          "p-4 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4",
          isSidebarOpen ? "" : "ml-12" // Adjust margin when sidebar is closed
        )}>
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor}/>
          ))}
        </div>
      </div>
    </div>
  );
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({doctor}) => {
  return (
    <Card data-testid="doctor-card">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <img src={doctor.photo} alt={doctor.name} className="w-16 h-16 rounded-full mr-4"/>
          <div>
            <div data-testid="doctor-name" className="font-semibold">{doctor.name}</div>
            <div data-testid="doctor-specialty" className="text-sm text-muted-foreground">
              {doctor.specialities.map((speciality) => speciality.name).join(', ')}
            </div>
          </div>
        </div>
        <div data-testid="doctor-experience" className="text-sm">
          Experience: {doctor.experience}
        </div>
        <div data-testid="doctor-fee" className="text-sm">Fee: {doctor.fees}</div>
        <Button className="mt-4">Book Appointment</Button>
      </CardContent>
    </Card>
  );
};

