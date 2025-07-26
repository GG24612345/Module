import { createClient } from "@supabase/supabase-js";

const Supa_Url = "https://jidtpypbthsqjjpgvcud.supabase.co";
const Supa_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Key pública (anon)

const supabase = createClient(Supa_Url, Supa_Key);

async function GetToken(PlaceID) {
  console.log("[GetToken] Token recebido para busca:", PlaceID);

  const { data, error } = await supabase
    .from("Module")
    .select("Powers")
    .eq("PlaceID", PlaceID)
    .single();

  if (error) {
    console.error("[GetToken] Erro ao buscar token:", error.message);
    return null;
  }

  console.log("[GetToken] Dados encontrados:", data);
  return data;
}

export default async function handler(req, res) {
  const { PlaceID } = req.query;

  if (!PlaceID) {
    return res.status(400).json({ error: "PlaceID ausente na query" });
  }

  const data = await GetToken(PlaceID);

  if (!data) {
    return res.status(404).json({ error: "Token não encontrado" });
  }

  return res.status(200).json(data);
}
