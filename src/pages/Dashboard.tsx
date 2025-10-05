import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalPasien: 245,
    dokter: 8
  });

  const StatCard = ({ title, value, icon: Icon, description, trend, color }: any) => (
    <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <span className="text-xs text-success">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang kembali, Dr. John Doe</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Pasien"
          value={stats.totalPasien}
          icon={Users}
          description="Pasien terdaftar"
          trend="+12% dari bulan lalu"
          color="text-primary"
        />
        <StatCard
          title="Dokter Aktif"
          value={stats.dokter}
          icon={Heart}
          description="Tim dokter"
          color="text-info"
        />
      </div>
    </div>
  );
};

export default Dashboard;