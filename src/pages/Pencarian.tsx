import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  FileText,
  Eye,
  X
} from "lucide-react";

const Pencarian = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDokter, setSelectedDokter] = useState("");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const mockData = [
    {
      idArsip: "A-2024-001",
      kodeArsip: "K-2024-001",
      tanggalArsip: "2024-01-15",
    },
    {
      idArsip: "A-2024-002",
      kodeArsip: "TP-2024-002",
      tanggalArsip: "2024-01-14",
    },
    {
      idArsip: "A-2024-003",
      kodeArsip: "K-2024-003",
      tanggalArsip: "2024-01-13",
    },
    {
      idArsip: "A-2024-004",
      kodeArsip: "LM-2024-004",
      tanggalArsip: "2024-01-12",
    },
    {
      idArsip: "A-2024-005",
      kodeArsip: "K-2024-005",
      tanggalArsip: "2024-01-11",
    }
  ];

  const [searchResults, setSearchResults] = useState(mockData);

  const handleSearch = () => {
    let filtered = mockData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.idArsip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kodeArsip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tanggalArsip.includes(searchTerm)
      );
    }

    setSearchResults(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDokter("");
    setSearchResults(mockData);
    setShowAdvancedFilter(false);
  };

  const activeFiltersCount = [
    searchTerm,
    selectedDokter,
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
                placeholder="Cari berdasarkan ID Arsip, Kode Arsip, atau Tanggal Arsip..."
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
              Filter Dokter
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
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2 max-w-xs">
                <Label>Dokter</Label>
                <Select value={selectedDokter} onValueChange={setSelectedDokter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih dokter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Dokter</SelectItem>
                    <SelectItem value="Dr. Tanti">Dr. Tanti</SelectItem>
                    <SelectItem value="Dr. Lina">Dr. Lina</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
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
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">ID Arsip</TableHead>
                    <TableHead className="font-semibold">Kode Arsip</TableHead>
                    <TableHead className="font-semibold">Tanggal Arsip</TableHead>
                    <TableHead className="font-semibold text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((item) => (
                    <TableRow key={item.idArsip} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{item.idArsip}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {item.kodeArsip}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(item.tanggalArsip).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => navigate(`/arsip/${item.idArsip}`)}
                        >
                          <Eye className="w-4 h-4" />
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Pencarian;
