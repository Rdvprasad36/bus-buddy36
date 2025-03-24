
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Bus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface DepotBusListProps {
  searchQuery: string;
  selectedDepot: string;
  viewMode?: "table" | "card" | "route";
}

// Bus route data structure
interface BusRoute {
  routeNo: string;
  from: string;
  to: string;
  via: string;
  notes: string;
  depot: string;
}

// Create the bus routes data
const busRoutes: BusRoute[] = [
  { routeNo: "6", from: "Simhachalam", to: "OHPO", via: "Gopalapatnam, NAD, Kancharapalem, Convent junction, Town Kotharoad", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "6A/H", from: "RTC complex", to: "Simhachalam hills", via: "Railway Station, Kancharapalem, NAD, Gopalapatnam", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "10A", from: "Visakhapatnam", to: "Airport R K Beach", via: "Via. NAD, Gurudwara, RTC Complex", notes: "Arrives at 12:30hrs and Departs at 13:00hrs", depot: "Waltair Depot" },
  { routeNo: "111", from: "Kurmannapalem", to: "Tagarapuvalasa", via: "Via. Gajuwaka, NAD, Gurudwara, Zoo Park, Madurwada", notes: "Highway Services", depot: "Gajuwaka Depot" },
  { routeNo: "5D", from: "TownKotharoad", to: "Dabbanda", via: "Convent, Kancharapalem, NAD, Gopalapatnam, Pendurthi", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "10K", from: "RTC complex", to: "Kailashagiri", via: "Jagadamba, Rk beach, Vuda park, Tenneti park", notes: "", depot: "Waltair Depot" },
  { routeNo: "28", from: "RK beach", to: "Simhachalam BusStation", via: "Jagadamba, RTC Complex, NAD, Gopalapatnam", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28R", from: "RK beach", to: "Simhachalam BusStation", via: "Jagadamba, RTC, Railway Station, NAD, Gopalapatnam", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28A/28K", from: "RK beach", to: "Pendurthy/Kottavalasa", via: "GPT, NAD, RTC, Jagadamba, Collector office", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28A/D", from: "RK beach", to: "Denderu", via: "Jagadamba, RTC, Railway Station, NAD, Gopalapatnam, Pendurthi", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28C", from: "RK Beach", to: "Chintalagraharama", via: "Jagadamba, RTC Complex, NAD, Gopalapatnam, Vepagunta", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28J", from: "RK Beach", to: "Sujatanagar", via: "Jagadamba, RTC Complex, NAD, Gopalapatnam, Vepagunta", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28P", from: "RK Beach", to: "Sabbavaram", via: "Jagadamba, RTC Complex, NAD, Gopalapatnam, Pendurthi", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28Z/H", from: "Zilla Parishad", to: "Simhachalam hills", via: "Jagadamba, RTC, Gurudwar, NAD, Gopalapatnam", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "28A/P", from: "RTC Complex", to: "Ravalammapalem", via: "Railway Station, Kancharapalem, NAD, GPT, Pendurthi", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "68/68K", from: "RK beach", to: "Pendurthi/Kothavalasa", via: "Jagadamba, Asilmetta, Maddilapalem, Arilova, Simhachalam", notes: "", depot: "Maddilapalem Depot" },
  { routeNo: "505", from: "Simhachalam", to: "Scindia", via: "Gopalapatnam, NAD, Kancharapalem, Convent Jn, naval Dockyard", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "55", from: "Simhachalam", to: "Scindia", via: "Gopalapatnam, NAD, BHPV, Gajuwaka, Malkapuram", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "55K", from: "Kothavalasa", to: "Scindia", via: "Pendurthi, Gopalapatnam, NAD, Gajuwaka, Malkapuram", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "55V", from: "Vepada", to: "Scindia", via: "Simhachalam, Gopalapatnam, NAD, Gajuwaka, Malkapuram", notes: "", depot: "Simhachalam Depot" },
  { routeNo: "55T", from: "Scindia", to: "Tagarapuvalasa", via: "malkapuram gajuwaka, NAD, Gopalpatnam, Pendurthy, Anandapuram", notes: "", depot: "Visakha Steel City Depot" },
  
  // Adding more routes for different depots
  { routeNo: "60", from: "Simhachalam", to: "OHPO", via: "Adavivaram, Maddilapalem, RTC Complex, Jagadamba", notes: "", depot: "Maddilapalem Depot" },
  { routeNo: "60R", from: "RK Beach", to: "Arilova Colony", via: "Jagadamba, RTC Complex, Maddilapalem", notes: "", depot: "Maddilapalem Depot" },
  { routeNo: "38", from: "RTC Complex", to: "Gajuwaka", via: "Gurudwara, NAD, BHPV", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "38A", from: "RTC Complex", to: "Mindi", via: "Gurudwara, NAD, BHPV", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "38B", from: "RTC Complex", to: "Bhanojithota", via: "Gurudwara, NAD, Sheelanagar", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "38C", from: "RTC Complex", to: "Sundarayya Colony", via: "Gurudwara, NAD, BHPV, Gajuwaka", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "38D", from: "RTC Complex", to: "Nadupur Dairy Colony", via: "Gurudwara, NAD, BHPV, Gajuwaka, Pedagantyada", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "38H", from: "RTC Complex", to: "Gantyada HB Colony", via: "Visakhapatnam Airport, Gurudwara, NAD, BHPV, Gajuwaka, Pedagantyada", notes: "Buses at 08:30hrs and 09:30hrs in Airport", depot: "Gajuwaka Depot" },
  { routeNo: "38IT", from: "Kurmannapalem", to: "IT Park", via: "Gajuwaka, NAD, Gurudwara, RTC Complex, Maddilapalem, Carshed", notes: "", depot: "Madhurawada Depot" },
  { routeNo: "38J", from: "RTC Complex", to: "Janata Colony", via: "Gurudwara, NAD, BHPV, Gajuwaka, Scindia", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "38K", from: "RTC Complex", to: "Steelplant Sector 5", via: "Gurudwara, NAD, BHPV, Gajuwaka", notes: "", depot: "Visakha Steel City Depot" },
  { routeNo: "38M", from: "Marikavalasa", to: "Kurmannapalem", via: "Madhurawada, Maddilapalem, Gurudwara, NAD, BHPV, Gajuwaka", notes: "", depot: "Madhurawada Depot" },
  { routeNo: "38N", from: "RTC Complex", to: "Nadupuru", via: "Gurudwara, NAD, BHPV, Gajuwaka, Pedagantyada", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "900K", from: "RTC Complex", to: "Bhimili", via: "Waltair, MVP Colony, Rushikonda, gitam, manga", notes: "", depot: "Waltair Depot" },
  { routeNo: "900T", from: "RTC Complex", to: "Tagarapuvalasa", via: "Waltair, MVP Colony, Rushikonda, gitam, mangamaripeta, INS Kalinga", notes: "", depot: "Waltair Depot" },
  { routeNo: "999", from: "RTC Complex", to: "Bhimili", via: "Maddilapalem, Endada, Madhurwada, Anandapuram", notes: "", depot: "Madhurawada Depot" },
  { routeNo: "222", from: "RTC Complex", to: "Tagarapuvalasa", via: "Maddilapalem, Endada, Madhurawada, Anandapuram", notes: "", depot: "Madhurawada Depot" },
  { routeNo: "400", from: "RTC Complex", to: "Kurmannapalem", via: "Railway Station, Scindia, Malkapuram, Gajuwaka", notes: "", depot: "Visakha Steel City Depot" },
  { routeNo: "400H", from: "Maddilapalem", to: "Gantyada HB Colony", via: "RTC, Railway Station, Scindia, Gajuwaka, Pedagantyada", notes: "", depot: "Gajuwaka Depot" },
  { routeNo: "400N", from: "RTC Complex", to: "Vadacheepurupalli", via: "Railway Station, Scindia, Malkapuram, Gajuwaka, Kurmannapalem, Sector 11, Parawada, NTPC", notes: "", depot: "Visakha Steel City Depot" },
];

export function DepotBusList({ searchQuery, selectedDepot, viewMode = "table" }: DepotBusListProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Filter bus routes
  let filteredRoutes = busRoutes;
  
  // Filter by depot
  if (selectedDepot !== "all") {
    filteredRoutes = filteredRoutes.filter(route => route.depot === selectedDepot);
  }
  
  // Filter by search query
  if (searchQuery) {
    filteredRoutes = filteredRoutes.filter(route => 
      route.routeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.via.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredRoutes.length === 0) {
    return (
      <div className="p-8 text-center border rounded-lg">
        <Bus className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No bus routes found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search query or selected depot
        </p>
      </div>
    );
  }

  if (viewMode === "route") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRoutes.map((route) => (
          <Card key={route.routeNo} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {route.routeNo}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {route.depot.split(" ")[0]}
                </Badge>
              </div>
              <div className="text-sm space-y-1">
                <div className="font-medium">{route.from} → {route.to}</div>
                <div className="text-muted-foreground text-xs line-clamp-2">{route.via}</div>
                {route.notes && (
                  <div className="text-xs text-orange-600 dark:text-orange-400 italic">
                    {route.notes}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Route No</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="hidden md:table-cell">Via</TableHead>
            <TableHead className="hidden md:table-cell">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoutes.map((route) => (
            <TableRow key={route.routeNo}>
              <TableCell className="font-medium">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {route.routeNo}
                </Badge>
              </TableCell>
              <TableCell>{route.from}</TableCell>
              <TableCell>{route.to}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="max-w-sm truncate">{route.via}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{route.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
