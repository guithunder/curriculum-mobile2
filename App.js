import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const candidate = {
    photo: 'https://imgs.search.brave.com/0jVEEZcc1A0arklpz25WiRC49Xcu2rQjEQMEqlS7XZc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2IzLzk4/LzFhL2IzOTgxYTUy/YjUzZmFjYzFmY2U5/ZmM0N2Q1ODkyNjgz/LmpwZw',
    fullName: 'Pica-pau dev',
    title: 'Desenvolvedor Front-end / React Native',
    about:
      'Desenvolvedor com 5+ anos de experiência em aplicações mobile e web. Busco oportunidades que permitam aplicar boas práticas em arquitetura, performance e UX, com foco em aplicativos responsivos e escaláveis.',

    // 👇 nova seção de contatos
    contacts: {
      email: 'picapaudev@email.com',
      phone: '+55 (81) 99999-0000',
      linkedin: 'https://linkedin.com/in/picapaudev',
      github: 'https://github.com/picapaudev',
      site: 'https://picapaudev.dev',
    },

    experiences: [
      {
        id: 'e1',
        company: 'Empresa A',
        role: 'Desenvolvedor Mobile',
        period: '2022 — Atual',
        description:
          'Atuação no desenvolvimento de aplicações React Native, integração com APIs REST, otimizações de performance e deploy via Expo.',
      },
      {
        id: 'e2',
        company: 'Empresa B',
        role: 'Front-end Engineer',
        period: '2000 — 2022',
        description:
          'Construção de interfaces em React, implementação de design systems e testes automatizados.',
      },
    ],
    education: [
      { id: 'c1', institution: 'Uninassau', course: 'Ciência da Computação', year: '2000' },
      { id: 'c2', institution: 'Uninassau de novo', course: 'UX Design - Bootcamp', year: '2020' },
    ],
    skills: [
      { id: 's1', name: 'React Native', level: 90 },
      { id: 's2', name: 'React.js', level: 85 },
      { id: 's3', name: 'TypeScript', level: 70 },
      { id: 's4', name: 'UI/UX', level: 90 },
      { id: 's5', name: 'Comunicação (soft)', level: 80 },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image source={{ uri: candidate.photo }} style={styles.photo} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{candidate.fullName}</Text>
            <Text style={styles.title}>{candidate.title}</Text>
          </View>
        </View>

        {/* Sobre */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.paragraph}>{candidate.about}</Text>
        </View>

        {/* 👇 Contatos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contatos</Text>
          <Text style={styles.contactText}>📧 {candidate.contacts.email}</Text>
          <Text style={styles.contactText}>📱 {candidate.contacts.phone}</Text>

          <TouchableOpacity onPress={() => Linking.openURL(candidate.contacts.linkedin)}>
            <Text style={[styles.contactText, styles.link]}>🔗 LinkedIn</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(candidate.contacts.github)}>
            <Text style={[styles.contactText, styles.link]}>💻 GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(candidate.contacts.site)}>
            <Text style={[styles.contactText, styles.link]}>🌐 Portfólio</Text>
          </TouchableOpacity>
        </View>

        {/* Experiências */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiências</Text>
          {candidate.experiences.map((exp) => (
            <TouchableOpacity
              key={exp.id}
              style={styles.listItem}
              onPress={() => setSelectedExperience(exp)}
            >
              <View>
                <Text style={styles.itemTitle}>{exp.role}</Text>
                <Text style={styles.itemSubtitle}>
                  {exp.company} · {exp.period}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Educação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação</Text>
          {candidate.education.map((edu) => (
            <View key={edu.id} style={styles.listItemStatic}>
              <View>
                <Text style={styles.itemTitle}>{edu.course}</Text>
                <Text style={styles.itemSubtitle}>
                  {edu.institution} · {edu.year}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* agilidade ai ai */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          {candidate.skills.map((skill) => (
            <View key={skill.id} style={styles.skillRow}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <View style={styles.skillBarBackground}>
                <View style={[styles.skillBarFill, { width: `${skill.level}%` }]} />
              </View>
              <Text style={styles.skillPercent}>{skill.level}%</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Modal de experiência */}
      <Modal
        visible={!!selectedExperience}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedExperience(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalRole}>{selectedExperience?.role}</Text>
            <Text style={styles.modalCompany}>
              {selectedExperience?.company} · {selectedExperience?.period}
            </Text>
            <Text style={styles.modalDesc}>{selectedExperience?.description}</Text>

            <Pressable style={styles.closeButton} onPress={() => setSelectedExperience(null)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f8' },
  scroll: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  photo: { width: 88, height: 88, borderRadius: 44, marginRight: 12 },
  headerText: { flex: 1 },
  name: { fontSize: 20, fontWeight: '700' },
  title: { fontSize: 14, color: '#555', marginTop: 4 },

  section: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  paragraph: { fontSize: 14, color: '#444', lineHeight: 20 },

  contactText: { fontSize: 14, color: '#333', marginBottom: 6 },
  link: { color: '#1d6fa5', textDecorationLine: 'underline' },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listItemStatic: { paddingVertical: 10, borderBottomColor: '#eee', borderBottomWidth: 1 },
  itemTitle: { fontSize: 15, fontWeight: '600' },
  itemSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  chevron: { fontSize: 22, color: '#bbb' },

  skillRow: { marginBottom: 10 },
  skillName: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  skillBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
    overflow: 'hidden',
  },
  skillBarFill: { height: '100%', borderRadius: 20, backgroundColor: '#4f94a9' },
  skillPercent: { marginTop: 6, fontSize: 12, color: '#666' },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)' },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 240,
  },
  modalRole: { fontSize: 18, fontWeight: '700' },
  modalCompany: { color: '#666', marginTop: 6, marginBottom: 12 },
  modalDesc: { fontSize: 14, lineHeight: 20, color: '#444' },
  closeButton: {
    marginTop: 18,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#346a74',
  },
  closeButtonText: { color: '#fff', fontWeight: '700' },
});
