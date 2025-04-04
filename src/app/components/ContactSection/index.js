"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [mensagemEnvio, setMensagemEnvio] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensagemEnvio("");

    // Simulando envio (em um cenário real, aqui seria feita uma chamada à API)
    setTimeout(() => {
      setMensagemEnvio(
        "Mensagem enviada com sucesso! Entraremos em contato em breve."
      );
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      });
      setEnviando(false);
    }, 1500);
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={`${styles.header} animate-on-scroll fadeInUp`}>
          <h2 className={styles.title}>Fale Conosco</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Entre em contato para agendar uma consulta ou obter mais informações
            sobre nossos serviços
          </p>
        </div>

        <div className={styles.content}>
          <div className={`${styles.info} animate-on-scroll fadeInLeft`}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📍</span>
              </div>
              <div>
                <h3>Endereço</h3>
                <p>Rua Exemplo, 123, 10º andar</p>
                <p>Centro - 00000-000 - São Paulo, SP Brasil</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📞</span>
              </div>
              <div>
                <h3>Telefone</h3>
                <p>+55 (11) 1234-5678</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>✉️</span>
              </div>
              <div>
                <h3>E-mail</h3>
                <p>contato@maisdireito.com.br</p>
              </div>
            </div>
          </div>

          <div
            className={`${styles.formContainer} animate-on-scroll fadeInRight`}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              {mensagemEnvio && (
                <div className={styles.successMessage}>{mensagemEnvio}</div>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Seu nome completo"
                  value={formData.nome}
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
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="Seu telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="mensagem">Mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Como podemos ajudar?"
                  rows="5"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={styles.button}
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
