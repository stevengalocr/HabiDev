import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { useHabits } from "@/hooks/useHabits";
import { useCategories } from "@/hooks/useCategories";
import { HabitCard } from "@/components/habits/HabitCard";
import { Colors } from "@/theme/Colors";

export default function HabitsScreen() {
  const { habits, loading, createHabit } = useHabits();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [goalDays, setGoalDays] = useState("30");
  const [creating, setCreating] = useState(false);

  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateHabit = async () => {
    if (!newHabitName.trim()) return;

    setCreating(true);
    const success = await createHabit({
      name: newHabitName,
      category_id: selectedCategory || undefined,
      goal_days: parseInt(goalDays) || 30,
    });

    if (success) {
      setNewHabitName("");
      setSelectedCategory(null);
      setGoalDays("30");
      setShowCreateForm(false);
    }
    setCreating(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Mis Hábitos</Text>
            <TouchableOpacity
              style={styles.addHeaderButton}
              onPress={() => setShowCreateForm(!showCreateForm)}
            >
              <Ionicons
                name={showCreateForm ? "close" : "add-circle"}
                size={32}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar hábitos..."
          placeholderTextColor={Colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Create Form */}
        {showCreateForm && (
          <View style={styles.createForm}>
            <Text style={styles.formTitle}>Crear Nuevo Hábito</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre del hábito"
              placeholderTextColor={Colors.textTertiary}
              value={newHabitName}
              onChangeText={setNewHabitName}
            />

            <Text style={styles.label}>Categoría</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.id &&
                      styles.categoryChipSelected,
                    { borderColor: category.color },
                    selectedCategory === category.id && {
                      backgroundColor: category.color + "20",
                    },
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  {category.icon && (
                    <Text style={styles.categoryChipIcon}>{category.icon}</Text>
                  )}
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category.id && {
                        color: category.color,
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Meta de días</Text>
            <TextInput
              style={styles.input}
              placeholder="30"
              placeholderTextColor={Colors.textTertiary}
              value={goalDays}
              onChangeText={setGoalDays}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateHabit}
              disabled={creating || !newHabitName.trim()}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.createButtonGradient}
              >
                {creating ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#FFFFFF"
                    />
                    <Text style={styles.createButtonText}>Crear Hábito</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Habits List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : filteredHabits.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="checkbox-outline"
              size={64}
              color={Colors.textTertiary}
            />
            <Text style={styles.emptyTitle}>
              {searchQuery
                ? "No se encontraron hábitos"
                : "No tienes hábitos aún"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? "Intenta con otra búsqueda"
                : "Crea tu primer hábito usando el botón +"}
            </Text>
          </View>
        ) : (
          <View style={styles.habitsList}>
            <Text style={styles.resultsCount}>
              {filteredHabits.length} hábito
              {filteredHabits.length !== 1 ? "s" : ""}
            </Text>
            {filteredHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  addHeaderButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  createForm: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primary + "40",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  categoriesScroll: {
    marginBottom: 12,
  },
  categoriesContainer: {
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.background,
  },
  categoryChipSelected: {
    borderWidth: 2,
  },
  categoryChipIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  createButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  createButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  loadingContainer: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  habitsList: {},
  resultsCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
});
