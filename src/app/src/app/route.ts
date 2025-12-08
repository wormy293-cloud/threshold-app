import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    const images: string[] = [];

    $("img").each((_: any, el: any) => {
      const src = $(el).attr("src") || $(el).attr("data-src");
      if (src && src.includes("http") && !src.includes("logo")) {
        images.push(src.split("?")[0]);
      }
    });

    const placeholderVideo =
      "https://cdn.coverr.co/videos/coverr-luxury-house-drone-shot-5681/1080p.mp4";

    return Response.json({
      videoUrl: placeholderVideo,
      imageCount: images.length,
      preview: images.slice(0, 3),
    });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}