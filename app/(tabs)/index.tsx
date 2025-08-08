import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGame } from '@/contexts/GameContext';
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface GameMode {
  id: 'cash' | 'tournaments';
  title: string;
  subtitle: string;
  icon: string;
  gradient: string[];
  accuracy: number;
  description: string;
}

interface Session {
  id: number;
  gameType: string;
  position: string;
  accuracy: number;
  date: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { selectedFormat, setSelectedFormat } = useGame();
  const [isSelecting, setIsSelecting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const gameModesData: GameMode[] = [
    {
      id: 'cash',
      title: 'Cash Games',
      subtitle: 'Deep stack strategy • 100bb+',
      icon: 'cash',
      gradient: ['#1a73e8', '#4285f4'],
      accuracy: 87,
      description: 'Master deep stack play with optimal ranges and sizing'
    },
    {
      id: 'tournaments',
      title: 'Spin & Go',
      subtitle: 'Short stack • Fast-paced',
      icon: 'trophy',
      gradient: ['#ea4335', '#fbbc05'],
      accuracy: 73,
      description: 'Perfect push/fold decisions and hyper-turbo strategy'
    },
  ];

  const recentSessions: Session[] = [
    { id: 1, gameType: 'NL50 Cash', position: 'BTN', accuracy: 92, date: '2h ago' },
    { id: 2, gameType: 'Spin & Go', position: 'SB', accuracy: 78, date: '1d ago' },
    { id: 3, gameType: 'NL25 Cash', position: 'BB', accuracy: 85, date: '2d ago' },
  ];

  const handleGameModeSelect = (mode: GameMode) => {
    setIsSelecting(true);
    setSelectedFormat(mode.id);
    
    // Navigate to Solver page after selection
    setTimeout(() => {
      setIsSelecting(false);
      setIsNavigating(true);
      
      setTimeout(() => {
        router.push('/(tabs)/camera'); // Navigate to Solver screen
        setIsNavigating(false);
      }, 200);
    }, 300);
  };

  const handleStartTraining = () => {
    const format = selectedFormat === 'cash' ? 'Cash Games' : 'Spin & Go';
    router.push({
      pathname: '/(tabs)/training',
      params: { gameType: selectedFormat, format: format }
    });
  };

  const GameModeCard = ({ mode }: { mode: GameMode }) => {
    const isSelected = selectedFormat === mode.id;
    const formatColor = mode.gradient[0]; // Use the format's primary color
    
    return (
      <TouchableOpacity 
        style={[
          styles.gameModeCard,
          isSelected && styles.gameModeCardSelected
        ]}
        onPress={() => handleGameModeSelect(mode)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.gameModeGradient, 
          { backgroundColor: mode.gradient[0] },
          isSelected && styles.gameModeGradientSelected
        ]}>
          <View style={styles.gameModeHeader}>
            {mode.id === 'cash' ? (
              <Ionicons name="cash" size={28} color="white" />
            ) : (
              <Ionicons name="trophy" size={28} color="white" />
            )}
            <View style={[styles.accuracyBadge, { backgroundColor: formatColor }]}>
              <Text style={styles.accuracyText}>{mode.accuracy}%</Text>
            </View>
          </View>
          
          <View style={styles.gameModeContent}>
            <Text style={styles.gameModeTitle}>{mode.title}</Text>
            <Text style={styles.gameModeSubtitle}>{mode.subtitle}</Text>
            <Text style={styles.gameModeDescription}>{mode.description}</Text>
          </View>

          {/* Selection Indicator */}
          {isSelected && (
            <View style={[styles.selectionIndicator, { backgroundColor: formatColor }]}>
              <Ionicons name="checkmark-circle" size={18} color="white" />
              <Text style={[styles.selectionText, { color: 'white' }]}>Active</Text>
            </View>
          )}

          {/* Navigate to Solver Indicator */}
          <View style={styles.navigateIndicator}>
            <Ionicons name="school" size={16} color="white" />
            <Text style={styles.navigateText}>To Solver</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CurrentSelectionBanner = () => {
    const currentMode = gameModesData.find(mode => mode.id === selectedFormat);
    if (!currentMode) return null;

    const bannerColor = selectedFormat === 'cash' ? '#1a73e8' : '#ea4335';

    return (
      <View style={[styles.selectionBanner, { backgroundColor: bannerColor }]}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerIcon}>
            {selectedFormat === 'cash' ? (
              <Ionicons name="cash" size={20} color="white" />
            ) : (
              <Ionicons name="trophy" size={20} color="white" />
            )}
          </View>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Current Format</Text>
            <Text style={styles.bannerSubtitle}>{currentMode.title}</Text>
          </View>
          <View style={styles.bannerButtons}>
            <TouchableOpacity 
              style={styles.bannerButton}
              onPress={() => router.push('/(tabs)/camera')}
            >
              <Ionicons name="camera" size={16} color={bannerColor} />
              <Text style={[styles.bannerButtonText, { color: bannerColor }]}>Solver</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.bannerButton, styles.bannerButtonSecondary, { 
                borderColor: 'white',
                backgroundColor: 'white'
              }]}
              onPress={handleStartTraining}
            >
              <Ionicons name="school" size={16} color={bannerColor} />
              <Text style={[styles.bannerButtonText, { color: bannerColor }]}>Train</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const RecentSessionItem = ({ session }: { session: Session }) => (
    <View style={styles.sessionItem}>
      <View style={styles.sessionLeft}>
        <View style={styles.sessionIcon}>
          <MaterialIcons name="casino" size={16} color="#6b7280" />
        </View>
        <View>
          <Text style={styles.sessionGameType}>{session.gameType}</Text>
          <Text style={styles.sessionPosition}>{session.position} • {session.date}</Text>
        </View>
      </View>
      <View style={styles.sessionRight}>
        <Text style={[
          styles.sessionAccuracy,
          { color: session.accuracy >= 85 ? '#10b981' : session.accuracy >= 70 ? '#f59e0b' : '#ef4444' }
        ]}>
          {session.accuracy}%
        </Text>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <ThemedText style={styles.title}>Welcom To Here 🤖</ThemedText>
              <ThemedText style={styles.subtitle}>Ready to improve your game?</ThemedText>
            </View>
            <TouchableOpacity style={styles.solverButton} onPress={() => router.push('/(tabs)/camera')}>
              <MaterialIcons name="center-focus-strong" size={24} color="#10b981" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Selection Banner */}
        <CurrentSelectionBanner />

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="documents" size={20} color="#6b7280" />
            <Text style={styles.statValue}>2,847</Text>
            <Text style={styles.statLabel}>Hands Analyzed</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="gps-fixed" size={20} color="#6b7280" />
            <Text style={styles.statValue}>87%</Text>
            <Text style={styles.statLabel}>Accuracy Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={20} color="#6b7280" />
            <Text style={styles.statValue}>24h</Text>
            <Text style={styles.statLabel}>Study Time</Text>
          </View>
        </View>

        {/* Game Modes Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Choose Game Format</ThemedText>
            <Text style={styles.sectionSubtitle}>Select a format to start GTO analysis</Text>
          </View>
          <View style={styles.gameModeContainer}>
            {gameModesData.map((mode) => (
              <GameModeCard key={mode.id} mode={mode} />
            ))}
          </View>
        </View>

        {/* Recent Sessions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Sessions</ThemedText>
          <View style={styles.sessionsList}>
            {recentSessions.map((session) => (
              <RecentSessionItem key={session.id} session={session} />
            ))}
          </View>
        </View>

        {/* Quick Tools */}
        <View style={styles.section_quick}>
          <ThemedText style={styles.sectionTitle}>Quick Tools</ThemedText>
          <View style={styles.toolsGrid}>
            <TouchableOpacity style={styles.toolCard}>
              <MaterialIcons name="grid-view" size={24} color="#1a73e8" />
              <Text style={styles.toolTitle}>Range Charts</Text>
              <Text style={styles.toolSubtitle}>Preflop ranges</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolCard}>
              <FontAwesome5 name="calculator" size={24} color="#ea4335" />
              <Text style={styles.toolTitle}>Bet Sizing</Text>
              <Text style={styles.toolSubtitle}>Optimal sizes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolCard}>
              <AntDesign name="calculator" size={24} color="#34a853" />
              <Text style={styles.toolTitle}>Equity Calculator</Text>
              <Text style={styles.toolSubtitle}>Hand vs range</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolCard}>
              <Ionicons name="pulse" size={24} color="#fbbc05" />
              <Text style={styles.toolTitle}>Hand History</Text>
              <Text style={styles.toolSubtitle}>Review sessions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavigationOverlay isVisible={isNavigating} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  solverButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 35,
  },
  section_quick: {
    paddingHorizontal: 20,
    marginBottom: 80
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  gameModeContainer: {
    gap: 16,
  },
  gameModeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1 }],
  },
  gameModeCardSelected: {
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  gameModeGradient: {
    padding: 20,
    position: 'relative',
  },
  gameModeGradientSelected: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  gameModeHeader: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  accuracyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  accuracyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  gameModeContent: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  gameModeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  gameModeSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  gameModeDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  selectionText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  navigateIndicator: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  navigateText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
    letterSpacing: 0.3,
  },
  selectionBanner: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
    marginLeft: 12,
  },
  bannerTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  bannerButtonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.1)', // This will be overridden inline
    borderWidth: 1,
  },
  bannerButtonSecondaryText: {
    // Color will be set inline dynamically
  },
  startTrainingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startTrainingText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  sessionsList: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sessionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sessionGameType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  sessionPosition: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  sessionRight: {
    alignItems: 'flex-end',
  },
  sessionAccuracy: {
    fontSize: 16,
    fontWeight: '600',
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: (width - 52) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 2,
    textAlign: 'center',
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  navigationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  navigationContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 10,
  },
});

// Navigation Overlay Component
const NavigationOverlay = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <View style={styles.navigationOverlay}>
      <View style={styles.navigationContainer}>
        <MaterialIcons name="center-focus-strong" size={40} color="#1a73e8" />
        <Text style={styles.navigationText}>Opening GTO Solver...</Text>
      </View>
    </View>
  );
};
