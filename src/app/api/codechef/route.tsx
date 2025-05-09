import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    try {
        // Using the unofficial Codechef API
        const apiUrl = `https://codechef-api.vercel.app/handle/${username}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
            console.error(`CodeChef API HTTP Error (${res.status}) for user ${username}: ${await res.text()}`);
            return NextResponse.json(
                { error: `Failed to fetch CodeChef profile (HTTP status ${res.status})` },
                { status: res.status }
            );
        }

        const data = await res.json();

        if (!data || data.error) {
            return NextResponse.json(
                { error: `CodeChef API error: ${data.error || "Profile Not Found"}` },
                { status: 404 }
            );
        }

        // Map the API response to the desired structure
        const userData = {
            username: username,
            ranking: data.countryRank,
            problemsSolved: data.stars,
            contests: data.heatMap.length,
            highestRating: data.highestRating,
            achievements: data.achievements ? data.achievements.slice(0, 4) : [],
        };

        return NextResponse.json(userData);

    } catch (error: any) {
        console.error(`Error fetching CodeChef profile from API for user ${username}:`, error);
        return NextResponse.json(
            { error: "Internal server error while processing CodeChef data", details: error.message },
            { status: 500 }
        );
    }
}
