import reraData from "@/data/rera-projects.json";

type ReraProject = {
  registrationNumber: string;
  projectName: string;
  promoterName: string;
  district: string;
  projectType: string;
  projectLocation: string;
  promoterAddress: string;
  contactDetails: string;
  source: string;
};

function normalize(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function findReraRegistration(
  registrationNumber: string
) {
  const normalizedInput = normalize(registrationNumber);

  return reraData.projects.find(
    (project: ReraProject) =>
      normalize(project.registrationNumber) ===
      normalizedInput
  );
}