import React, { useState } from 'react';
import { WebHeader } from './ui/web-header';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from './ui/sidebar';
import { DashboardScreen } from './admin/DashboardScreen';
import { BookingsScreen } from './admin/BookingsScreen';
import { TipsLedgerScreen } from './admin/TipsLedgerScreen';
import { CoverageExceptionsScreen } from './admin/CoverageExceptionsScreen';
import { CMSScreen } from './admin/CMSScreen';
import { CustomersScreen } from './admin/CustomersScreen';
import { PartnerCompaniesScreen } from './admin/PartnerCompaniesScreen';
import { PartnerIndividualsScreen } from './admin/PartnerIndividualsScreen';
import { PartnerMembersScreen } from './admin/PartnerMembersScreen';
import { ServiceCatalogScreen } from './admin/ServiceCatalogScreen';
import { ServiceAreasScreen } from './admin/ServiceAreasScreen';
import { TransactionsScreen } from './admin/TransactionsScreen';
import { PartnerPayoutsScreen } from './admin/PartnerPayoutsScreen';
import { PromotionsScreen } from './admin/PromotionsScreen';
import { CampaignsScreen } from './admin/CampaignsScreen';
import { AnalyticsScreen } from './admin/AnalyticsScreen';
import { ExportDataScreen } from './admin/ExportDataScreen';
import { BusinessProfileScreen } from './admin/BusinessProfileScreen';
import { IntegrationsScreen } from './admin/IntegrationsScreen';
import { 
  Users, 
  ShoppingCart, 
  IndianRupee, 
  Calendar,
  TrendingUp,
  Search,
  Download,
  Building,
  Wrench,
  Shield,
  MapPin,
  Megaphone,
  BarChart3,
  Settings,
  Layout
} from 'lucide-react';

interface AdminPortalProps {
  onBack: () => void;
}

type AdminScreen = 
  | 'dashboard' 
  | 'users-customers'
  | 'users-partners-companies'
  | 'users-partners-individuals'
  | 'users-partner-members'
  | 'bookings-all'
  | 'payments-transactions'
  | 'payments-tips'
  | 'payments-payouts'
  | 'catalog-services'
  | 'service-areas'
  | 'coverage-exceptions'
  | 'promotions'
  | 'campaigns'
  | 'reports'
  | 'exports'
  | 'cms-layout'
  | 'settings-business'
  | 'settings-integrations';

export function AdminPortal({ onBack }: AdminPortalProps) {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('dashboard');

  const sidebarItems = [
    {
      title: "Users & Access",
      items: [
        { title: "Customers", icon: Users, id: "users-customers" },
        { title: "Partners (Companies)", icon: Building, id: "users-partners-companies" },
        { title: "Partners (Individuals)", icon: Wrench, id: "users-partners-individuals" },
        { title: "Partner Members", icon: Users, id: "users-partner-members" },
      ]
    },
    {
      title: "Bookings & Services",
      items: [
        { title: "All Bookings", icon: Calendar, id: "bookings-all" },
        { title: "Service Catalog", icon: Wrench, id: "catalog-services" },
        { title: "Service Areas", icon: MapPin, id: "service-areas" },
      ]
    },
    {
      title: "Finance & Payments",
      items: [
        { title: "Transactions", icon: IndianRupee, id: "payments-transactions" },
        { title: "Tips Ledger", icon: IndianRupee, id: "payments-tips" },
        { title: "Partner Payouts", icon: ShoppingCart, id: "payments-payouts" },
      ]
    },
    {
      title: "Operations",
      items: [
        { title: "Coverage Exceptions", icon: Shield, id: "coverage-exceptions" },
        { title: "CMS & Layout", icon: Layout, id: "cms-layout" },
        { title: "Promotions", icon: Megaphone, id: "promotions" },
        { title: "Campaigns", icon: TrendingUp, id: "campaigns" },
      ]
    },
    {
      title: "Reports",
      items: [
        { title: "Analytics", icon: BarChart3, id: "reports" },
        { title: "Export Data", icon: Download, id: "exports" },
      ]
    },
    {
      title: "Settings",
      items: [
        { title: "Business Profile", icon: Building, id: "settings-business" },
        { title: "Integrations", icon: Settings, id: "settings-integrations" },
      ]
    }
  ];

  const handleNotifications = () => {
    // TODO: Implement notifications panel
    console.log('Notifications clicked');
  };

  const handleSettings = () => {
    setCurrentScreen('settings-business');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onBack();
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={setCurrentScreen} />;
      case 'users-customers':
        return <CustomersScreen />;
      case 'users-partners-companies':
        return <PartnerCompaniesScreen />;
      case 'users-partners-individuals':
        return <PartnerIndividualsScreen />;
      case 'users-partner-members':
        return <PartnerMembersScreen />;
      case 'bookings-all':
        return <BookingsScreen />;
      case 'payments-transactions':
        return <TransactionsScreen />;
      case 'payments-tips':
        return <TipsLedgerScreen />;
      case 'payments-payouts':
        return <PartnerPayoutsScreen />;
      case 'catalog-services':
        return <ServiceCatalogScreen />;
      case 'service-areas':
        return <ServiceAreasScreen />;
      case 'coverage-exceptions':
        return <CoverageExceptionsScreen />;
      case 'promotions':
        return <PromotionsScreen />;
      case 'campaigns':
        return <CampaignsScreen />;
      case 'reports':
        return <AnalyticsScreen />;
      case 'exports':
        return <ExportDataScreen />;
      case 'cms-layout':
        return <CMSScreen />;
      case 'settings-business':
        return <BusinessProfileScreen />;
      case 'settings-integrations':
        return <IntegrationsScreen />;
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {sidebarItems.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => setCurrentScreen(item.id as AdminScreen)}
                          isActive={currentScreen === item.id}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <WebHeader 
            title="Admin Portal" 
            onNotifications={handleNotifications}
            onSettings={handleSettings}
            onLogout={handleLogout}
          />
          <main className="flex-1 overflow-y-auto p-6">
            {renderScreen()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}