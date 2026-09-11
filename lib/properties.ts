import { createClient } from "@/lib/supabase/server";

import type { Property } from "@/data/properties";

export type BuyerAmenity = {
    name: string;
    icon: string;
};

export type BuyerProperty = Property & {
  slug: string;
  amenityDetails?: BuyerAmenity[];
};

type PropertyRow = {
    id: string;
    title: string;
    slug: string;
    property_type: "Apartment" | "Villa" | "Plot";
    location: string | null;
    location_slug: string | null;
    city: string | null;
    price: number | null;
    area: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    description: string | null;
    possession: string | null;
    rera_registration_number: string | null;

    property_images: {
        id: string;
        storage_path: string;
        public_url: string | null;
        display_order: number;
        is_cover: boolean;
    }[];

    property_videos: {
        id: string;
        storage_path: string;
        public_url: string | null;
    }[];

    property_features: {
        feature: string;
    }[];

    property_amenities: {
        amenity: string;
        icon: string | null;
    }[];
};

function mapProperty(row: PropertyRow): BuyerProperty {
    const images = [...(row.property_images ?? [])]
        .filter((image) => image.public_url)
        .sort((a, b) => {
            if (a.is_cover && !b.is_cover) return -1;
            if (!a.is_cover && b.is_cover) return 1;

            return a.display_order - b.display_order;
        })
        .map((image) => image.public_url!)
        .filter(Boolean);

    const video = row.property_videos?.[0]?.public_url ?? undefined;

    return {
        id: row.id,
        title: row.title,
        slug: row.slug,

        location: row.location ?? "",
        locationSlug: row.location_slug ?? "",
        city: row.city ?? "",

        price: Number(row.price ?? 0),
        area: Number(row.area ?? 0),
        bedrooms: row.bedrooms ?? 0,
        bathrooms: row.bathrooms ?? 0,

        propertyType: row.property_type,

        // First image is always the cover image.
        image:
            images[0] ??
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",

        images,

        video,

        features:
            row.property_features?.map(
                (item) => item.feature
            ) ?? [],

        amenities:
            row.property_amenities?.map(
                (item) => item.amenity
            ) ?? [],

        amenityDetails:
            row.property_amenities?.map((item) => ({
                name: item.amenity,
                icon: item.icon ?? "sparkles",
            })) ?? [],

        possession: row.possession ?? undefined,

        description: row.description ?? "",

        rera: row.rera_registration_number
            ? {
                registered: true,
                registrationNumber: row.rera_registration_number,
                verified: false,
                verifiedOn: "",
                source: "Punjab RERA",
            }
            : undefined,
    };
}

export async function getPublishedProperties(): Promise<BuyerProperty[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("properties")
        .select(`
      id,
      title,
      slug,
      property_type,
      location,
      location_slug,
      city,
      price,
      area,
      bedrooms,
      bathrooms,
      description,
      possession,
      rera_registration_number,

      property_images (
        id,
        storage_path,
        public_url,
        display_order,
        is_cover
      ),

      property_videos (
        id,
        storage_path,
        public_url
      ),

      property_features (
        feature
      ),

      property_amenities (
        amenity,
        icon
      )
    `)
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to load published properties:", error);
        throw new Error("Unable to load properties.");
    }

    return (data ?? []).map((row) =>
        mapProperty(row as PropertyRow)
    );
}

export async function getPublishedPropertyById(
    id: string
): Promise<BuyerProperty | null> {
    const supabase = await createClient();

    let query = supabase
        .from("properties")
        .select(`
      id,
      title,
      slug,
      property_type,
      location,
      location_slug,
      city,
      price,
      area,
      bedrooms,
      bathrooms,
      description,
      possession,
      rera_registration_number,

      property_images (
        id,
        storage_path,
        public_url,
        display_order,
        is_cover
      ),

      property_videos (
        id,
        storage_path,
        public_url
      ),

      property_features (
        feature
      ),

      property_amenities (
        amenity,
        icon
      )
    `)
        .eq("status", "published");

    // Admin-created properties use UUID IDs.
    // This also allows the page to work with a slug.
    const looksLikeUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            id
        );

    if (looksLikeUuid) {
        query = query.eq("id", id);
    } else {
        query = query.eq("slug", id);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
        console.error("Failed to load property:", error);
        throw new Error("Unable to load property.");
    }

    if (!data) {
        return null;
    }

    return mapProperty(data as PropertyRow);
}


export async function getFeaturedProperties(): Promise<BuyerProperty[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("properties")
        .select(`
      id,
      title,
      slug,
      property_type,
      location,
      location_slug,
      city,
      price,
      area,
      bedrooms,
      bathrooms,
      description,
      possession,
      rera_registration_number,

      property_images (
        id,
        storage_path,
        public_url,
        display_order,
        is_cover
      ),

      property_videos (
        id,
        storage_path,
        public_url
      ),

      property_features (
        feature
      ),

      property_amenities (
        amenity,
        icon
      )
    `)
        .eq("status", "published")
        .eq("featured", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to load featured properties:", error);
        throw new Error("Unable to load featured properties.");
    }

    return (data ?? []).map((row) =>
        mapProperty(row as PropertyRow)
    );
}
