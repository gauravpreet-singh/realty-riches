import { NextRequest, NextResponse } from "next/server";
import { findReraRegistration } from "@/lib/rera";

export async function GET(request: NextRequest) {
  const registrationNumber = request.nextUrl.searchParams
    .get("registrationNumber")
    ?.trim();

  if (!registrationNumber) {
    return NextResponse.json(
      {
        found: false,
        message: "Please enter a RERA registration number.",
      },
      { status: 400 }
    );
  }

  const project = findReraRegistration(registrationNumber);

  if (!project) {
    return NextResponse.json({
      found: false,
      message:
        "No matching registration was found in the Punjab RERA dataset.",
    });
  }

  return NextResponse.json({
    found: true,

    project: {
      projectName: project.projectName,
      registrationNumber: project.registrationNumber,
      promoterName: project.promoterName,
      district: project.district,
      projectType: project.projectType,
      projectLocation: project.projectLocation,
      promoterAddress: project.promoterAddress,
      contactDetails: project.contactDetails,
      source: project.source,
    },
  });
}