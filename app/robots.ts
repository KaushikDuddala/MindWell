import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/counselor", "/appointments/my-appointments", "/api"],
      },
    ],
    sitemap: "https://mindwell.com/sitemap.xml",
  }
}
