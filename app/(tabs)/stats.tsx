import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

export default function StatsScreen() {
  const overallStats: StatCard[] = [
    {
      title: 'Overall Accuracy',
      value: '87%',
      subtitle: '+5% this week',
      icon: 'target',
      color: '#22c55e'
    },
    {
      title: 'Hands Played',
      value: '1,247',
      subtitle: '156 this week',
      icon: 'gamecontroller.fill',
      color: '#3b82f6'
    },
    {
      title: 'Study Time',
      value: '24h',
      subtitle: '3.2h this week',
      icon: 'clock.fill',
      color: '#f59e0b'
    },
    {
      title: 'Win Rate',
      value: '+12bb/100',
      subtitle: 'Cash games',
      icon: 'chart.line.uptrend.xyaxis',
      color: '#8b5cf6'
    },
  ];

  const positionStats = [
    { position: 'Button', accuracy: 92, hands: 198, color: '#22c55e' },
    { position: 'Cut-off', accuracy: 89, hands: 167, color: '#3b82f6' },
    { position: 'Big Blind', accuracy: 84, hands: 234, color: '#f59e0b' },
    { position: 'Small Blind', accuracy: 78, hands: 201, color: '#ef4444' },
    { position: 'UTG', accuracy: 86, hands: 145, color: '#8b5cf6' },
  ];

  const recentSessions = [
    { date: '2h ago', gameType: 'Cash NL50', hands: 45, accuracy: 91, result: '+2.3bb' },
    { date: '1d ago', gameType: 'Spin & Go', hands: 23, accuracy: 87, result: '+0.8bb' },
    { date: '2d ago', gameType: 'Cash NL25', hands: 67, accuracy: 83, result: '-1.2bb' },
    { date: '3d ago', gameType: 'Training', hands: 89, accuracy: 94, result: 'Study' },
  ];

  const StatCardComponent = ({ stat }: { stat: StatCard }) => {
    // Map stat types to appropriate Ionicons
    const getIconName = (title: string) => {
      switch (title) {
        case 'Overall Accuracy':
          return 'checkmark-circle';
        case 'Hands Played':
          return 'play-circle';
        case 'Study Time':
          return 'time';
        case 'Win Rate':
          return 'trending-up';
        default:
          return 'help-circle';
      }
    };

    return (
      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <View style={[styles.iconContainer, { backgroundColor: `${stat.color}15` }]}>
            <Ionicons 
              name={getIconName(stat.title) as any} 
              size={20} 
              color={stat.color} 
            />
          </View>
          <Text style={styles.statTitle}>{stat.title}</Text>
        </View>
        <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
        <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
      </View>
    );
  };

  const PositionBar = ({ position, accuracy, hands, color }: any) => (
    <View style={styles.positionRow}>
      <View style={styles.positionInfo}>
        <Text style={styles.positionName}>{position}</Text>
        <Text style={styles.positionHands}>{hands} hands</Text>
      </View>
      <View style={styles.positionBar}>
        <View 
          style={[
            styles.positionProgress, 
            { width: `${accuracy}%`, backgroundColor: color }
          ]} 
        />
      </View>
      <Text style={[styles.positionAccuracy, { color }]}>{accuracy}%</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Performance Analytics</ThemedText>
          <ThemedText style={styles.subtitle}>Track your GTO progress</ThemedText>
        </View>

        {/* Overall Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {overallStats.map((stat, index) => (
              <StatCardComponent key={index} stat={stat} />
            ))}
          </View>
        </View>

        {/* Position Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Position Analysis</Text>
          <View style={styles.positionChart}>
            {positionStats.map((position, index) => (
              <PositionBar
                key={index}
                position={position.position}
                accuracy={position.accuracy}
                hands={position.hands}
                color={position.color}
              />
            ))}
          </View>
        </View>

        {/* Accuracy Trend */}
        <View style={styles.section}>
          <View style={styles.trendHeader}>
            <Text style={styles.sectionTitle}>Accuracy Trend</Text>
            <View style={styles.trendPeriod}>
              <Text style={styles.trendPeriodText}>Last 7 days</Text>
            </View>
          </View>
          <View style={styles.trendChart}>
            <View style={styles.trendContent}>
              {/* Y-axis labels */}
              <View style={styles.yAxisLabels}>
                <Text style={styles.yAxisLabel}>100%</Text>
                <Text style={styles.yAxisLabel}>75%</Text>
                <Text style={styles.yAxisLabel}>50%</Text>
                <Text style={styles.yAxisLabel}>25%</Text>
              </View>
              
              {/* Chart area */}
              <View style={styles.chartArea}>
                {/* Grid lines */}
                <View style={styles.gridLines}>
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                </View>
                
                {/* Data points with connecting line */}
                <View style={styles.trendLineContainer}>
                  <View style={styles.dataPointContainer}>
                    <View style={[styles.trendDataPoint, { bottom: '75%' }]} />
                    <Text style={styles.dataValue}>87%</Text>
                  </View>
                  <View style={styles.dataPointContainer}>
                    <View style={[styles.trendDataPoint, { bottom: '60%', backgroundColor: '#f59e0b' }]} />
                    <Text style={styles.dataValue}>73%</Text>
                  </View>
                  <View style={styles.dataPointContainer}>
                    <View style={[styles.trendDataPoint, { bottom: '80%', backgroundColor: '#22c55e' }]} />
                    <Text style={styles.dataValue}>91%</Text>
                  </View>
                  <View style={styles.dataPointContainer}>
                    <View style={[styles.trendDataPoint, { bottom: '85%', backgroundColor: '#22c55e' }]} />
                    <Text style={styles.dataValue}>94%</Text>
                  </View>
                  <View style={styles.dataPointContainer}>
                    <View style={[styles.trendDataPoint, { bottom: '82%', backgroundColor: '#22c55e' }]} />
                    <Text style={styles.dataValue}>92%</Text>
                  </View>
                </View>
              </View>
            </View>
            
            {/* X-axis labels */}
            <View style={styles.trendLabels}>
              <Text style={styles.trendLabel}>Mon</Text>
              <Text style={styles.trendLabel}>Tue</Text>
              <Text style={styles.trendLabel}>Wed</Text>
              <Text style={styles.trendLabel}>Thu</Text>
              <Text style={styles.trendLabel}>Fri</Text>
            </View>
            
            {/* Summary stats */}
            <View style={styles.trendSummary}>
              <View style={styles.summaryItem}>
                <Ionicons name="trending-up" size={16} color="#22c55e" />
                <Text style={styles.summaryText}>+7% this week</Text>
              </View>
              <View style={styles.summaryItem}>
                <Ionicons name="calendar" size={16} color="#6b7280" />
                <Text style={styles.summaryText}>5 sessions</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          <View style={styles.sessionsList}>
            {recentSessions.map((session, index) => (
              <View key={index} style={styles.sessionItem}>
                <View style={styles.sessionLeft}>
                  <Text style={styles.sessionGame}>{session.gameType}</Text>
                  <Text style={styles.sessionDetails}>
                    {session.hands} hands • {session.accuracy}% accuracy
                  </Text>
                </View>
                <View style={styles.sessionRight}>
                  <Text style={[
                    styles.sessionResult,
                    { color: session.result.includes('+') ? '#22c55e' : 
                             session.result.includes('-') ? '#ef4444' : '#666' }
                  ]}>
                    {session.result}
                  </Text>
                  <Text style={styles.sessionDate}>{session.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section_quick}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="download" size={20} color="#007AFF" />
              <Text style={styles.actionText}>Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="refresh" size={20} color="#007AFF" />
              <Text style={styles.actionText}>Reset Stats</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  section_quick: {
    paddingHorizontal: 20,
    marginBottom: 80
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  positionChart: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  positionInfo: {
    width: 80,
  },
  positionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  positionHands: {
    fontSize: 12,
    color: '#666',
  },
  positionBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  positionProgress: {
    height: '100%',
    borderRadius: 4,
  },
  positionAccuracy: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  trendChart: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  trendContent: {
    flexDirection: 'row',
    height: 100,
  },
  yAxisLabels: {
    justifyContent: 'space-between',
    width: 40,
    height: 100,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
    marginLeft: 10,
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  trendLineContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  dataPointContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  trendDataPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dataValue: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '600',
    marginTop: 4,
  },
  trendLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendLabel: {
    fontSize: 12,
    color: '#666',
  },
  sessionsList: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sessionLeft: {
    flex: 1,
  },
  sessionGame: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sessionDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  sessionRight: {
    alignItems: 'flex-end',
  },
  sessionResult: {
    fontSize: 16,
    fontWeight: '600',
  },
  sessionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendPeriod: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  trendPeriodText: {
    fontSize: 14,
    color: '#666',
  },
  trendSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
}); 