"use client";

import { useState, useEffect } from "react";

// Define the platform data structure
export interface PlatformData {
  name: string;
  logo: string;
  username: string;
  profileUrl: string;
  stats: {
    ranking: string | number;
    problemsSolved: number;
    contests: number;
    highestRating: string | number;
  };
  achievements: string[];
  color: string;
}

// Platform configuration
const platformConfig = [
  {
    name: "LeetCode",
    logo: "leetcode",
    username: "aryasuraj351",
    profileUrl: "https://leetcode.com/u/aryasuraj351/",
    apiEndpoint: "/api/leetcode",
    color: "#FFA116",
  },
  {
    name: "GeeksforGeeks",
    logo: "gfg",
    username: "aryasuryv2d",
    profileUrl: "https://www.geeksforgeeks.org/user/aryasuryv2d/",
    apiEndpoint: "/api/geeksforgeeks",
    color: "#2F8D46",
  },
  {
    name: "CodeChef",
    logo: "codechef",
    username: "xerol",
    profileUrl: "https://www.codechef.com/users/xerol",
    apiEndpoint: "/api/codechef",
    color: "#5B4638",
  },
  {
    name: "Codeforces",
    logo: "codeforces",
    username: "aryasuraj351",
    profileUrl: "https://codeforces.com/profile/aryasuraj351",
    apiEndpoint: "/api/codeforces",
    color: "#318CE7",
  },
];

export default function FetchData() {
  const [platformsData, setPlatformsData] = useState<PlatformData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchPlatformData() {
      try {
        setIsLoading(true);
        setError(null);

        // Check if we have cached data in localStorage and it's less than 1 hour old
        const cachedData = localStorage.getItem("platformsData");
        const cachedTimestamp = localStorage.getItem("platformsDataTimestamp");

        if (cachedData && cachedTimestamp) {
          const timestamp = new Date(cachedTimestamp);
          const now = new Date();
          const hoursSinceLastFetch =
            (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);

          if (hoursSinceLastFetch < 1) {
            // Use cached data if it's less than 1 hour old
            setPlatformsData(JSON.parse(cachedData));
            setLastFetched(timestamp);
            setIsLoading(false);
            return;
          }
        }

        // Fetch data for each platform in parallel
        const platformPromises = platformConfig.map(async (platform) => {
          try {
            // Add a random query parameter to bypass cache
            const cacheParam = `cache=${Date.now()}`;
            const response = await fetch(
              `${platform.apiEndpoint}?username=${platform.username}&${cacheParam}`
            );

            if (!response.ok) {
              throw new Error(
                `Failed to fetch data from ${platform.name}: ${response.status}`
              );
            }

            const data = await response.json();

            return {
              name: platform.name,
              logo: platform.logo,
              username: data.username || platform.username,
              profileUrl: platform.profileUrl,
              stats: {
                ranking: data.ranking || "N/A",
                problemsSolved: data.problemsSolved || 0,
                contests: data.contests || 0,
                highestRating: data.highestRating || "N/A",
              },
              achievements: data.achievements || [],
              color: platform.color,
            };
          } catch (err) {
            console.error(`Error fetching data for ${platform.name}:`, err);

            // Return fallback data for this platform
            return {
              name: platform.name,
              logo: platform.logo,
              username: platform.username,
              profileUrl: platform.profileUrl,
              stats: {
                ranking: "N/A",
                problemsSolved: 0,
                contests: 0,
                highestRating: "N/A",
              },
              achievements: [
                "Data temporarily unavailable",
                "Please check back later",
              ],
              color: platform.color,
            };
          }
        });

        // Wait for all platform data to be fetched
        const results = await Promise.all(platformPromises);

        // Cache the results in localStorage
        localStorage.setItem("platformsData", JSON.stringify(results));
        localStorage.setItem(
          "platformsDataTimestamp",
          new Date().toISOString()
        );

        setPlatformsData(results);
        setLastFetched(new Date());
      } catch (err) {
        console.error("Error fetching platform data:", err);
        setError("Failed to fetch platform data. Please try again later.");

        // Try to use cached data even if it's old
        const cachedData = localStorage.getItem("platformsData");
        if (cachedData) {
          setPlatformsData(JSON.parse(cachedData));
          const cachedTimestamp = localStorage.getItem(
            "platformsDataTimestamp"
          );
          if (cachedTimestamp) {
            setLastFetched(new Date(cachedTimestamp));
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlatformData();
  }, []);

  return { platformsData, isLoading, error, lastFetched };
}
