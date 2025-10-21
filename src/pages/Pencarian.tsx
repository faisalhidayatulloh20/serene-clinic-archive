import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pencarian = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDokter, setSelectedDokter] = useState("all");

  const allPatientData = [
    {
      kodeArsip: "K-2024-001",
      namaPasien: "Budi Santoso",
      dokter: "Dr. Amelia",
      diagnosa: "Gangguan Cemas",
      file: "assessment_budi.pdf",
    },
    {
      kodeArsip: "K-2024-001",
      namaPasien: "Rina Wijayanti",
      dokter: "Dr. Budi",
      diagnosa: "Depresi Ringan",
      file: "assessment_rina.pdf",
    },
    {
      kodeArsip: "P-2024-002",
      namaPasien: "Ahmad Dahlan",
      dokter: "Dr. Citra",
      diagnosa: "Stres Kerja",
      file: "assessment_ahmad.pdf",
    },
    {
      kodeArsip: "P-2024-002",
      namaPasien: "Siti Aminah",
      dokter: "Dr. Amelia",
      diagnosa: "PTSD",
      file: "assessment_siti.pdf",
    },
    {
      kodeArsip: "X-2024-001",
      namaPasien: "Rina Malahayati",
      dokter: "Dr. Budi",
      diagnosa: "Gangguan Panik",
      file: "assessment_rina_m.pdf",
    },
  ];

  const dokterList = ["Dr. Amelia", "Dr. Budi", "Dr. Citra"];

  // Smart search function
  const smartSearch = (item: typeof allPatientData[0], query: string) => {
    if (!query) return true;
    
    const keywords = query.toLowerCase().split(" ").filter(k => k.length > 0);
    const searchableText = `${item.namaPasien} ${item.diagnosa} ${item.dokter} ${item.kodeArsip}`.toLowerCase();
    
    return keywords.every(keyword => searchableText.includes(keyword));
  };

  const filteredData = allPatientData.filter((item) => {
    const matchesSearch = smartSearch(item, searchTerm);
    const matchesDokter = selectedDokter === "all" || item.dokter === selectedDokter;
    return matchesSearch && matchesDokter;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Pencarian Arsip</h1>
        <p className="text-muted-foreground">
          Cari data pasien di seluruh sistem dengan cepat dan mudah
        </p>
      </div>

      <Card className="shadow-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Ketik beberapa kata kunci (cth: Rina Depresi)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-base bg-muted/50 border-border focus:ring-2 focus:ring-primary"
              />
            </div>
            <Select value={selectedDokter} onValueChange={setSelectedDokter}>
              <SelectTrigger className="w-full sm:w-[200px] py-6 bg-muted/50">
                <SelectValue placeholder="Semua Dokter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Dokter</SelectItem>
                {dokterList.map((dokter) => (
                  <SelectItem key={dokter} value={dokter}>
                    {dokter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Hasil Pencarian
          </CardTitle>
          <CardDescription>Menampilkan {filteredData.length} hasil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Nama Pasien</TableHead>
                  <TableHead>Diagnosa</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Kode Arsip</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Tidak ada hasil pencarian. Coba kata kunci lain.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{item.namaPasien}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{item.diagnosa}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.dokter}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.kodeArsip}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm">{item.file}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:bg-primary/10"
                            onClick={() => navigate(`/arsip/${item.kodeArsip}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-secondary hover:bg-secondary/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pencarian;
