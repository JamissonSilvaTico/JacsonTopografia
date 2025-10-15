import React, { useState, useEffect, useCallback } from "react";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../../api/companyService";
import { Company } from "../../types";

type CompanyFormData = Omit<Company, "_id">;

const CompanyFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  company: Company | null;
}> = ({ isOpen, onClose, onSave, company }) => {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: "",
    logoSvg: "",
    order: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        logoSvg: company.logoSvg,
        order: company.order,
      });
    } else {
      setFormData({ name: "", logoSvg: "", order: 0 });
    }
  }, [company, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (company) {
        await updateCompany(company._id, formData);
      } else {
        await addCompany(formData);
      }
      onSave();
    } catch (error) {
      console.error("Failed to save company:", error);
      alert("Falha ao salvar a empresa.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {company ? "Editar Empresa" : "Adicionar Nova Empresa"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Código SVG do Logo</label>
            <textarea
              name="logoSvg"
              value={formData.logoSvg}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded font-mono"
              rows={8}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Cole o código completo do SVG. Certifique-se que o SVG tenha
              atributos de altura e/ou largura (ex: `class="h-10 w-auto"`).
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ordem de Exibição</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CompaniesEditorPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const loadCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Failed to load companies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const handleAdd = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta empresa?")) {
      await deleteCompany(id);
      loadCompanies();
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    loadCompanies();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Empresas Parceiras</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
        >
          Adicionar Empresa
        </button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordem
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companies.map((company) => (
                  <tr key={company._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className="w-32 h-12 flex items-center justify-start text-gray-700"
                        dangerouslySetInnerHTML={{ __html: company.logoSvg }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(company)}
                        className="text-sky-600 hover:text-sky-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(company._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CompanyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        company={selectedCompany}
      />
    </div>
  );
};

export default CompaniesEditorPage;
