import tarotData from "./tarot.json" with { type: "json" };
import zhouyiData from "./zhouyi.json" with { type: "json" };
import guangongData from "./guangong.json" with { type: "json" };

export type FortuneResult = {
  method: string;
  title: string;
  symbol: string;
  interpretation: string;
  summary: string;
  cardImage: string;
};

// This defines the object structure for your frontend
export type FortuneResponse = Record<string, FortuneResult>;

type MethodType = "tarot" | "zhouyi" | "guangong";

export function drawFortune(
  prompt: string,
  method: MethodType | "all"
): FortuneResponse {

  const performDraw = (type: MethodType): FortuneResult => {
    switch (type) {
      case "tarot": {
        const chosenId = Math.floor(Math.random() * tarotData.length);
        const isReversed = Math.random() < 0.5;
        const orientation = isReversed ? "Reversed" : "Upright";
        const drawMeta = tarotData[chosenId];

        return {
          method: "tarot",
          title: `${drawMeta.name} (${orientation})`,
          symbol: "🃏",
          cardImage: `tarot/${drawMeta?.image_url}`,
          interpretation: `**Orientation:** ${orientation}. ${drawMeta?.description}`,
          summary: `You drew ${drawMeta.name} (${orientation}).`
        };
      }

      case "zhouyi": {
        const metaMap: Record<string, any> = {};
        zhouyiData.forEach((meta: any) => { metaMap[meta.binary] = meta; });

        let binaryDraw = "";
        for (let i = 0; i < 6; i++) {
          binaryDraw += Math.floor(Math.random() * 2).toString();
        }

        const drawMeta = metaMap[binaryDraw] || zhouyiData[0];
        return {
          method: "zhouyi",
          title: drawMeta.name,
          symbol: "☯️",
          cardImage: `zhouyi/${drawMeta?.image_url}`,
          interpretation: drawMeta?.description,
          summary: `Hexagram result: ${drawMeta.name}`
        };
      }

      case "guangong": {
        const metaMap: Record<string, any> = {};
        guangongData.forEach((meta: any) => { metaMap[meta.binary] = meta; });

        let binaryDraw = "";
        for (let i = 0; i < 2; i++) {
          binaryDraw += Math.floor(Math.random() * 2).toString();
        }

        const drawMeta = metaMap[binaryDraw] || guangongData[0];
        return {
          method: "guangong",
          title: drawMeta.name || "Guangong Oracle",
          symbol: "🏮",
          cardImage: `guangong/${drawMeta?.image_url}`,
          interpretation: drawMeta?.description,
          summary: `Divine Lot: ${drawMeta.name}`
        };
      }
    }
  };

  const results: FortuneResponse = {};

  if (method === "all") {
    const methods: MethodType[] = ["tarot", "zhouyi", "guangong"];
    methods.forEach((m) => {
      results[m] = performDraw(m);
    });
  } else {
    results[method] = performDraw(method);
  }

  return results;
}
