"use client";

import React, { useState } from "react";

export default function UploadExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Nuevos estados
  const [idProyecto, setIdProyecto] = useState("");
  const [idTipoJornada, setIdTipoJornada] = useState("");
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [quincena, setQuincena] = useState("");

  const fileInfo = file
    ? `${file.name} - ${(file.size / 1024).toFixed(2)} KB`
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setMessage(null);

    const selected = e.target.files && e.target.files[0];
    if (!selected) {
      setFile(null);
      return;
    }

    if (
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ].includes(selected.type)
    ) {
      setError("Por favor seleccioná un archivo Excel válido (.xls o .xlsx)");
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!file) {
      setError("Debés seleccionar un archivo primero.");
      return;
    }

    // Validaciones simples
    if (!idProyecto || !idTipoJornada || !anio || !mes || !quincena) {
      setError("Completá todos los campos antes de continuar.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id_proyecto", idProyecto);
    formData.append("id_tipojornada", idTipoJornada);
    formData.append("anio", anio);
    formData.append("mes", mes);
    formData.append("quincena", quincena);

    try {
      const res = await fetch("http://localhost:3000/api/hourimport", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error desconocido del servidor");
      }

      const data = await res.json();
      setMessage(data.message || "Archivo procesado con éxito.");
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement).value = "";
    } catch (err: any) {
      setError(err.message || "Error al subir el archivo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: 480,
        margin: "3rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 1rem",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem" }}>Subir archivo Excel</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label>Id Proyecto:</label>
        <input
          type="number"
          value={idProyecto}
          onChange={(e) => setIdProyecto(e.target.value)}
          disabled={uploading}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label>Id Tipo Jornada:</label>
        <input
          type="number"
          value={idTipoJornada}
          onChange={(e) => setIdTipoJornada(e.target.value)}
          disabled={uploading}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label>Año:</label>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          disabled={uploading}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label>Mes (1-12):</label>
        <input
          type="number"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          min={1}
          max={12}
          disabled={uploading}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label>Quincena (1 o 2):</label>
        <input
          type="number"
          value={quincena}
          onChange={(e) => setQuincena(e.target.value)}
          min={1}
          max={2}
          disabled={uploading}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label htmlFor="file-input" style={{ display: "block", marginBottom: 8 }}>
          Seleccioná un archivo Excel (.xls o .xlsx):
        </label>

        <input
          id="file-input"
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ marginBottom: "1rem" }}
        />

        {fileInfo && (
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Archivo seleccionado: <strong>{fileInfo}</strong>
          </p>
        )}

        <button
          type="submit"
          disabled={uploading || !file}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: uploading || !file ? "not-allowed" : "pointer",
            backgroundColor: uploading || !file ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            transition: "background-color 0.3s ease",
          }}
        >
          {uploading ? "Subiendo..." : "Subir y procesar"}
        </button>
      </form>

      {message && (
        <p role="alert" style={{ marginTop: "1.5rem", color: "green", fontWeight: "600" }}>
          {message}
        </p>
      )}

      {error && (
        <p role="alert" style={{ marginTop: "1.5rem", color: "red", fontWeight: "600" }}>
          {error}
        </p>
      )}
    </main>
  );
}
