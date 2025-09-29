import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  FileText,
  User,
  Download,
  Eye,
  X
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

const Pencarian = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPsikolog, setSelectedPsikolog] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const mockData = [
    {
      id: "ARS001",
      nama: "Maria Santos",
      usia: 28,
      jenisKelamin: "Perempuan",
      diagnosis: "Gangguan Kecemasan",
      tanggal: "2024-01-15",
      psikolog: "Dr. Sarah Ahmad",
      kategori: "Konseling",
      status: "Aktif",
      file: "assessment_maria_santos.pdf"
    },
    {
      id: "ARS002",
      nama: "Ahmad Rahman",
      usia: 35,
      jenisKelamin: "Laki-laki",
      diagnosis: "Depresi Ringan",
      tanggal: "2024-01-14",
      psikolog: "Dr. John Doe",
      kategori: "Tes Psikologi",
      status: "Selesai",
      file: "tes_psikologi_ahmad.pdf"
    },
    {
      id: "ARS003",
      nama: "Siti Nurhaliza",
      usia: 23,
      jenisKelamin: "Perempuan",
      diagnosis: "Stress Akademik",
      tanggal: "2024-01-13",
      psikolog: "Dr. Lisa Wong",
      kategori: "Konseling",
      status: "Aktif",
      file: "konseling_siti.pdf"
    },
    {
      id: "ARS004",
      nama: "Budi Santoso",
      usia: 42,
      jenisKelamin: "Laki-laki",
      diagnosis: "Burnout Syndrome",
      tanggal: "2024-01-12",
      psikolog: "Dr. Michael Chen",
      kategori: "Terapi",
      status: "Dalam Proses",
      file: "terapi_budi.pdf"
    },
    {
      id: "ARS005",
      nama: "Diana Sari",
      usia: 31,
      jenisKelamin: "Perempuan",
      diagnosis: "PTSD",
      tanggal: "2024-01-11",
      psikolog: "Dr. Sarah Ahmad",
      kategori: "Laporan Medis",
      status: "Aktif",
      file: "laporan_diana.pdf"
    }
  ];

  const [searchResults, setSearchResults] = useState(mockData);

  const handleSearch = () => {
    let filtered = mockData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.kategori === selectedCategory);
    }

    // Filter by psikolog
    if (selectedPsikolog) {
      filtered = filtered.filter(item => item.psikolog === selectedPsikolog);
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setSearchResults(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedPsikolog("");
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchResults(mockData);
    setShowAdvancedFilter(false);
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory,
    selectedPsikolog,
    startDate && endDate
  ].filter(Boolean).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pencarian Arsip</h1>
        <p className="text-muted-foreground">Cari dan filter arsip pasien berdasarkan kriteria tertentu</p>
      </div>

      {/* Search Form */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Pencarian Arsip Pasien
          </CardTitle>
          <CardDescription>
            Gunakan filter di bawah untuk mencari arsip pasien
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Search */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Cari berdasarkan ID Arsip, Nama Pasien, atau Diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-base"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-gradient-primary hover:shadow-hover transition-all duration-300 px-6"
            >
              <Search className="w-4 h-4 mr-2" />
              Cari
            </Button>
          </div>

          {/* Advanced Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filter Lanjutan
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Hapus Filter
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilter && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Kategori</SelectItem>
                    <SelectItem value="Konseling">Konseling</SelectItem>
                    <SelectItem value="Tes Psikologi">Tes Psikologi</SelectItem>
                    <SelectItem value="Laporan Medis">Laporan Medis</SelectItem>
                    <SelectItem value="Terapi">Terapi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Psikolog</Label>
                <Select value={selectedPsikolog} onValueChange={setSelectedPsikolog}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih psikolog" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Psikolog</SelectItem>
                    <SelectItem value="Dr. John Doe">Dr. John Doe</SelectItem>
                    <SelectItem value="Dr. Sarah Ahmad">Dr. Sarah Ahmad</SelectItem>
                    <SelectItem value="Dr. Lisa Wong">Dr. Lisa Wong</SelectItem>
                    <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tanggal Mulai</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: id }) : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Tanggal Akhir</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: id }) : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
            Hasil Pencarian
          </CardTitle>
          <CardDescription>
            Ditemukan {searchResults.length} arsip yang sesuai dengan kriteria pencarian
          </CardDescription>
        </CardHeader>
        <CardContent>
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Tidak ada hasil ditemukan</h3>
              <p className="text-muted-foreground">Coba ubah kriteria pencarian atau filter Anda</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {searchResults.map((item) => (
                <Card key={item.id} className="hover:shadow-hover transition-all duration-300 border border-border">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs font-mono">
                            {item.id}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.kategori}
                          </Badge>
                          <Badge 
                            variant={item.status === 'Aktif' ? 'default' : item.status === 'Selesai' ? 'outline' : 'secondary'}
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">{item.nama}</p>
                              <p className="text-muted-foreground">{item.usia} tahun, {item.jenisKelamin}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Diagnosis</p>
                            <p className="font-medium text-foreground">{item.diagnosis}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Tanggal</p>
                              <p className="font-medium text-foreground">
                                {new Date(item.tanggal).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Psikolog</p>
                            <p className="font-medium text-foreground">{item.psikolog}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Eye className="w-4 h-4" />
                          Lihat Detail
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          Unduh
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Pencarian;