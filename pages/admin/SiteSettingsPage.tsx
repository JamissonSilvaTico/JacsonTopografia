import React, { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "../../api/settingsService";
import { SiteSettings } from "../../types";

const SiteSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, logoType: e.target.value as "text" | "image" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    setMessage("");
    try {
      await updateSiteSettings(settings);
      setMessage("Configurações salvas com sucesso!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Ocorreu um erro ao salvar as configurações.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p>Carregando configurações...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Configurações do Logo
          </h2>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Tipo de Logo</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="logoType"
                  value="text"
                  checked={settings.logoType === "text"}
                  onChange={handleRadioChange}
                  className="form-radio h-4 w-4 text-sky-600"
                />
                <span className="ml-2 text-gray-700">Texto</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="logoType"
                  value="image"
                  checked={settings.logoType === "image"}
                  onChange={handleRadioChange}
                  className="form-radio h-4 w-4 text-sky-600"
                />
                <span className="ml-2 text-gray-700">Imagem</span>
              </label>
            </div>
          </div>

          {settings.logoType === "text" ? (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Linha 1 do Texto
                </label>
                <input
                  type="text"
                  name="logoTextLine1"
                  value={settings.logoTextLine1 || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Linha 2 do Texto
                </label>
                <input
                  type="text"
                  name="logoTextLine2"
                  value={settings.logoTextLine2 || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  URL da Imagem do Logo
                </label>
                <input
                  type="url"
                  name="logoImageUrl"
                  value={settings.logoImageUrl || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recomendado: imagem com fundo transparente (PNG) e altura
                  máxima de 60px.
                </p>
              </div>
            </div>
          )}

          {message && <p className="text-sm text-green-600 my-4">{message}</p>}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-sky-400"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsPage;
