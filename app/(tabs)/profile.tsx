import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [autoCapture, setAutoCapture] = React.useState(false);
  const [hapticFeedback, setHapticFeedback] = React.useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t('profile.gamePreferences'),
      items: [
        { label: t('profile.settings.defaultGameType'), value: 'Cash Game', icon: 'game-controller' },
        { label: t('profile.settings.stackSize'), value: '100bb', icon: 'layers' },
        { label: t('profile.settings.analysisSpeed'), value: 'Fast', icon: 'speedometer' },
      ]
    },
    {
      title: t('profile.trainingSettings'),
      items: [
        { label: t('profile.settings.difficultyLevel'), value: 'Advanced', icon: 'library' },
        { label: t('profile.settings.sessionLength'), value: '30 minutes', icon: 'time' },
        { label: t('profile.settings.focusAreas'), value: 'Preflop, Turn', icon: 'bulb' },
      ]
    },
    {
      title: t('profile.dataPrivacy'),
      items: [
        { label: t('profile.settings.exportHandHistory'), value: '', icon: 'share' },
        { label: t('profile.settings.clearCache'), value: '', icon: 'trash' },
        { label: t('profile.settings.privacyPolicy'), value: '', icon: 'shield-checkmark' },
      ]
    }
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <ThemedText style={styles.name}>John Doe</ThemedText>
          <ThemedText style={styles.email}>john.doe@example.com</ThemedText>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{t('profile.subscriptionInfo.title')}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>87%</Text>
            <Text style={styles.quickStatLabel}>{t('dashboard.accuracy')}</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>1,247</Text>
            <Text style={styles.quickStatLabel}>{t('dashboard.handsPlayed')}</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>24h</Text>
            <Text style={styles.quickStatLabel}>{t('dashboard.studyTime')}</Text>
          </View>
        </View>

        {/* Settings Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.quickSettings')}</Text>
          <View style={styles.settingsGroup}>
            {/* Language Selector */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="language" size={20} color="#007AFF" />
                <Text style={styles.settingLabel}>{t('common.language')}</Text>
              </View>
              <LanguageSelector 
                buttonStyle={styles.languageSelectorButton}
                textStyle={styles.languageSelectorText}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications" size={20} color="#007AFF" />
                <Text style={styles.settingLabel}>{t('profile.settings.notifications')}</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
                thumbColor="white"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="camera" size={20} color="#007AFF" />
                <Text style={styles.settingLabel}>{t('profile.settings.autoCapture')}</Text>
              </View>
              <Switch
                value={autoCapture}
                onValueChange={setAutoCapture}
                trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
                thumbColor="white"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="phone-portrait" size={20} color="#007AFF" />
                <Text style={styles.settingLabel}>{t('profile.settings.hapticFeedback')}</Text>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
                thumbColor="white"
              />
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuGroup}>
              {section.items.map((item, itemIndex) => {
                // Define icon colors based on the item
                const getIconColor = (label: string) => {
                  switch (label) {
                    case 'Default Game Type':
                    case 'Stack Size':
                      return '#22c55e'; // Green
                    case 'Analysis Speed':
                      return '#22c55e'; // Green
                    case 'Difficulty Level':
                      return '#22c55e'; // Green
                    case 'Session Length':
                      return '#22c55e'; // Green
                    case 'Focus Areas':
                      return '#22c55e'; // Green
                    case 'Export Hand History':
                    case 'Clear Cache':
                    case 'Privacy Policy':
                      return '#22c55e'; // Green
                    default:
                      return '#666';
                  }
                };

                const iconColor = getIconColor(item.label);

                return (
                  <TouchableOpacity key={itemIndex} style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={[styles.iconBackground, { backgroundColor: `${iconColor}15` }]}>
                        <Ionicons name={item.icon as any} size={18} color={iconColor} />
                      </View>
                      <Text style={styles.menuLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.menuRight}>
                      {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                      <Ionicons name="chevron-forward" size={16} color="#666" />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Subscription Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.subscription')}</Text>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.subscriptionTitle}>{t('profile.subscriptionInfo.title')}</Text>
              <View style={styles.subscriptionBadge}>
                <Text style={styles.subscriptionBadgeText}>{t('profile.subscriptionInfo.status')}</Text>
              </View>
            </View>
            <Text style={styles.subscriptionDescription}>
              {t('profile.subscriptionInfo.description')}
            </Text>
            <Text style={styles.subscriptionRenewal}>
              {t('profile.subscriptionInfo.renewsOn')} March 15, 2024
            </Text>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>{t('profile.subscriptionInfo.manageSubscription')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support & About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.supportAbout')}</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name="help-circle" size={20} color="#666" />
                <Text style={styles.menuLabel}>{t('profile.settings.helpFAQ')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name="mail" size={20} color="#666" />
                <Text style={styles.menuLabel}>{t('profile.settings.contactSupport')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name="information-circle" size={20} color="#666" />
                <Text style={styles.menuLabel}>{t('profile.settings.about')}</Text>
              </View>
              <View style={styles.menuRight}>
                <Text style={styles.menuValue}>v1.0.0</Text>
                <Ionicons name="chevron-forward" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section_sign_out}>
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={() => {
              // In a real app, you'd clear auth state here
              router.push('/(auth)/welcome');
            }}
          >
            <Text style={styles.signOutText}>{t('profile.signOut')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  section_sign_out: {
    paddingHorizontal: 20,
    marginBottom: 80
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  settingsGroup: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 12,
  },
  languageSelectorButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  languageSelectorText: {
    fontSize: 14,
    color: '#007AFF',
  },
  menuGroup: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 12,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  subscriptionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subscriptionBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subscriptionBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  subscriptionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  subscriptionRenewal: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  manageButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  manageButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  signOutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
}); 