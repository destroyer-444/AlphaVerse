export interface NavigationItem {
  label: string;
  href: string;
  group?: "Primary" | "Secondary";
  description?: string;
  children?: NavigationItem[];
}
