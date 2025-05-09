import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // 1) Fetch from the unofficial GfG API
    const apiUrl = `https://geeks-for-geeks-api.vercel.app/${encodeURIComponent(
      username
    )}`;
    const res = await fetch(apiUrl); // Revalidation is handled by the `export const revalidate` line

    // This API returns a 200 OK even for "Profile Not Found", with an error in the JSON body.
    // So, we always try to parse JSON first.
    const raw = await res.json();

    // Check if the API itself returned an error (e.g., "Profile Not Found")
    if (raw.error) {
      return NextResponse.json(
        { error: `GfG API error: ${raw.error}` },
        { status: res.status === 200 ? 404 : res.status } // If API gave 200 for an error, we send 404. Otherwise, propagate.
      );
    }
    
    // If !res.ok and raw.error was not set, it's an unexpected error from the API server
    if (!res.ok) {
        console.error(`GfG API HTTP Error (${res.status}) for user ${username}: ${await res.text()}`);
        return NextResponse.json(
            { error: `Failed to fetch GfG profile (HTTP status ${res.status})` },
            { status: res.status }
        );
    }


    // 2) Map the raw fields into your desired shape based on the API structure
    const info = raw.info || {}; // Access the nested 'info' object
    const solvedStats = raw.solvedStats || {}; // Access the nested 'solvedStats' object

    // Helper function to safely parse integers, defaulting to 0 if NaN
    const parseIntOrDefault = (value: string | number | undefined, defaultValue = 0) => {
        const parsed = parseInt(String(value), 10);
        return isNaN(parsed) ? defaultValue : parsed;
    };

    //Determine Ranking
    let ranking = "Beginner";
    const codingScore = parseIntOrDefault(info.codingScore);
    if (codingScore >= 2400) ranking = "Grandmaster";
    else if (codingScore >= 2100) ranking = "Master";
    else if (codingScore >= 1900) ranking = "Candidate Master";
    else if (codingScore >= 1600) ranking = "Expert";
    else if (codingScore >= 1400) ranking = "Specialist";
    else if (codingScore >= 1200) ranking = "Pupil";
  
      //Generate Achievements
    const achievements: string[] = [];

    if (codingScore >= 1900) achievements.push("Candidate Master Achievement");
    if (codingScore >= 1600) achievements.push("Expert Coder");
    if (parseIntOrDefault(info.totalProblemsSolved) >= 200) achievements.push("Problem Solving Master");

      // Ensure we have at least some achievements
    if (achievements.length < 3) {
        if (parseIntOrDefault(info.totalProblemsSolved) >= 100) achievements.push("A2OJ Ladder Completion");
        achievements.push("Practice Enthusiast");
        achievements.push("Dedicated Coder");
    }

    const userData = {
      username: info.userName || username, // API field: info.userName
      ranking: ranking,
      problemsSolved: parseIntOrDefault(info.totalProblemsSolved), // API field: info.totalProblemsSolved (string)
      contests: 0, // This field is not provided by this API
      highestRating: codingScore, // Using info.codingScore as a proxy for rating.
      achievements: achievements.slice(0, 4), //Limit to 4 achievements

      // Problem counts by difficulty are nested under solvedStats.category.count
      problemsByDifficulty: {
        school: solvedStats.school?.count ?? 0,
        basic: solvedStats.basic?.count ?? 0,
        easy: solvedStats.easy?.count ?? 0, // 'easy' structure assumed from 'basic'/'medium'/'hard'
        medium: solvedStats.medium?.count ?? 0,
        hard: solvedStats.hard?.count ?? 0,
      },
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error(`Error fetching GfG profile from arnoob16's API for user ${username}:`, error);
    // This catch block handles network errors during fetch or if res.json() fails (e.g., API returns non-JSON response)
    return NextResponse.json(
      { error: "Internal server error while processing GfG data", details: error },
      { status: 500 }
    );
  }
}
