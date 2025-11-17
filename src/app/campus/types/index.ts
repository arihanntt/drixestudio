import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Student {
  name: string;
  branch: string;
  interests: string[];
  image: string;
  bio: string;
  skills: string[];
}

export interface Group {
  icon: string;
  title: string;
  desc: string;
  members: string;
  gradient: string;
  activity: string;
}

export interface Profile {
  name: string;
  branch: string;
  interests: string;
  lookingFor: string;
  image: string;
}