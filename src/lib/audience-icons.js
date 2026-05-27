import {
  Building2,
  ChefHat,
  Factory,
  Hotel,
  UtensilsCrossed,
} from "lucide-react";

const MAP = {
  hotel: Hotel,
  utensils: UtensilsCrossed,
  "chef-hat": ChefHat,
  building: Building2,
  factory: Factory,
};

export function getAudienceIcon(name) {
  return MAP[name] ?? Building2;
}
