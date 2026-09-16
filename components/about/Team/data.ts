export interface TeamMember {
  name: string;
  role: string;
  image: { label: string; alt: string };
}

export interface TeamData {
  eyebrow: string;
  heading: string;
  pendingNote: string;
  members: TeamMember[];
}

// No staff photos or bios have been supplied yet. Do not invent members,
// credentials, or portraits — add entries to `members` only once the
// clinic confirms real staff to display.
export const teamData: TeamData = {
  eyebrow: "Team",
  heading: "The people behind Sakha.",
  pendingNote:
    "[CLIENT INPUT REQUIRED] Staff profiles will appear here once confirmed by the clinic.",
  members: [],
};