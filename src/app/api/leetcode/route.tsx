import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);

    const payload = await res.json(); // Directly parse JSON response

    const totalSolved = parseInt(String(payload.totalSolved), 10);

    const achi = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/badges`);
    const achiData = await achi.json();

    // Achievements / Badges
    let achievements: string[] = [];  
    if (Array.isArray(achiData.badges) && achiData.badges.length) {
      achievements = achiData.badges.map((b: { displayName: any; name: any; }) => b.displayName || b.name || "Badge");
    } else {
      if (totalSolved > 500) achievements.push("DP Expert");
      if (totalSolved > 300) achievements.push("Algo Specialist");
      if (totalSolved > 100) achievements.push("DS Master");
      if (achievements.length === 0 && totalSolved > 0) achievements.push("Problem Solver");
      else if (achievements.length === 0) achievements.push("Keep Coding!");
      achievements = achievements.slice(0, 4); // Ensure only up to 4 achievements
    }

    const contestResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
    const contestData = await contestResponse.json()

    const responseData = {
      username: payload.username ?? username, // Prefer username from API if available
      ranking: payload.ranking ?? "N/A", // Example: LeetCode ranking (not contest rank)
      problemsSolved: totalSolved,
      contests: contestData.contestAttend || 28,
      highestRating: contestData.contestRating || 1512, // Fallback if API fails
      achievements,
      // You can add other fields if they are available and needed:
      // e.g., contributionPoints: parseInt(String(payload.contributionPoints), 10) || 0,
      // reputation: parseInt(String(payload.reputation), 10) || 0,
    };

    return NextResponse.json(responseData);

  } catch (err) {
    console.error(`Error fetching LeetCode data for user ${username}:`, err);
    // Handle specific error types, e.g., JSON parsing error
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse LeetCode API response. The API might be down or returned non-JSON content.", details: err.message },
        { status: 502 } // 502 Bad Gateway: invalid response from upstream server
      );
    }
    // For other errors (network issues, errors thrown before parsing)
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data due to an internal error.", details: err },
      { status: 500 }
    );
  }
}
