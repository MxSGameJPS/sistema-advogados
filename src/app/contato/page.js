"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para enviar o formulário
    console.log("Formulário enviado:", formData);
    alert("Obrigado pelo contato! Retornaremos em breve.");

    // Limpar o formulário
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Entre em Contato</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Estamos prontos para atender às suas necessidades jurídicas
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <div className={styles.contactHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>📍</span>
                </div>
                <h2>Endereço</h2>
              </div>
              <div className={styles.contactDetails}>
                <p>Rua Exemplo, 123, 10º andar</p>
                <p>Centro - 00000-000 - São Paulo, SP Brasil</p>
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>📞</span>
                </div>
                <h2>Telefone</h2>
              </div>
              <div className={styles.contactDetails}>
                <p>+55 (11) 1234-5678</p>
                <p>+55 (11) 9876-5432</p>
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>✉️</span>
                </div>
                <h2>E-mail</h2>
              </div>
              <div className={styles.contactDetails}>
                <p>contato@maisdireito.com.br</p>
                <p>atendimento@maisdireito.com.br</p>
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>⏰</span>
                </div>
                <h2>Horário de Atendimento</h2>
              </div>
              <div className={styles.contactDetails}>
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábados: Fechado</p>
                <p>Domingos e Feriados: Fechado</p>
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Envie-nos uma mensagem</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup + " " + styles.fullWidth}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.button}>
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>

        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Nossa Localização</h2>
          <div className={styles.mapPlaceholder}>
            {/* Aqui seria adicionado um mapa do Google Maps ou similar */}
            <div className={styles.mapContent}>
              <p>Mapa será carregado aqui na versão final</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
