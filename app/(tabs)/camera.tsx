import { ThemedView } from '@/components/ThemedView';
import { useGame } from '@/contexts/GameContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface AnalysisResult {
  decision: string;
  confidence: number;
  reasoning: string;
  alternatives?: string[];
}

export default function CameraScreen() {
  const { selectedFormat, formatDisplayName } = useGame();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoCapture, setAutoCapture] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getFormatSpecificDecisions = () => {
    if (selectedFormat === 'cash') {
      return {
        decisions: ['FOLD', 'CALL', 'RAISE 2.5x', 'RAISE 3.5x', 'RAISE POT'],
        scenarios: [
          'Deep stack post-flop decision',
          'Multi-way pot analysis',
          'Betting line optimization',
          'Value vs bluff sizing'
        ]
      };
    } else {
      return {
        decisions: ['FOLD', 'CALL', 'SHOVE', 'MIN-RAISE'],
        scenarios: [
          'Push/fold decision',
          'Short stack play',
          'ICM consideration',
          'Hyper-turbo strategy'
        ]
      };
    }
  };

  const generateFormatSpecificAnalysis = (): AnalysisResult => {
    const { decisions, scenarios } = getFormatSpecificDecisions();
    const randomDecision = decisions[Math.floor(Math.random() * decisions.length)];
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%

    if (selectedFormat === 'cash') {
      return {
        decision: randomDecision,
        confidence,
        reasoning: `${randomScenario}. Deep stack allows for complex post-flop play.`,
        alternatives: decisions.filter(d => d !== randomDecision).slice(0, 2)
      };
    } else {
      return {
        decision: randomDecision,
        confidence,
        reasoning: `${randomScenario}. Short stack requires push/fold simplification.`,
        alternatives: decisions.filter(d => d !== randomDecision).slice(0, 1)
      };
    }
  };

  const handleTakePhoto = async () => {
    setIsAnalyzing(true);
    
    // Simulate format-specific image processing and GTO analysis
    setTimeout(() => {
      const analysis = generateFormatSpecificAnalysis();
      setLastAnalysis(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleImageUpload = async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant permission to access your photo library to upload poker table images.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9], // Good aspect ratio for poker tables
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        
        // Start analysis with the uploaded image
        setIsAnalyzing(true);
        setLastAnalysis(null);
        
        Alert.alert(
          'Image Uploaded',
          `Analyzing ${formatDisplayName} table image...`,
          [{ text: 'OK' }]
        );
        
        // Simulate analysis of the uploaded image
        setTimeout(() => {
          const analysis = generateFormatSpecificAnalysis();
          setLastAnalysis(analysis);
          setIsAnalyzing(false);
        }, 3000); // Slightly longer for image analysis
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(
        'Upload Error',
        'Failed to select image. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const toggleAutoCapture = () => {
    setAutoCapture(!autoCapture);
    if (!autoCapture) {
      Alert.alert(
        'Auto Capture Enabled',
        `The app will now analyze ${formatDisplayName} situations every 2 seconds`,
        [{ text: 'OK' }]
      );
    }
  };

  const getFormatColor = () => {
    return selectedFormat === 'cash' ? '#1a73e8' : '#ea4335';
  };

  const getFormatIcon = () => {
    return selectedFormat === 'cash' ? 'cash' : 'trophy';
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header with Format Display */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={[styles.logoBackground, { backgroundColor: getFormatColor() }]}>
            <MaterialIcons name="memory" size={40} color="white" />
          </View>
        </View>
        
        <Text style={styles.title}>GTO Solver</Text>
        <Text style={styles.subtitle}>Real-time poker analysis</Text>
        
        {/* Current Format Indicator */}
        <View style={[styles.formatIndicator, { backgroundColor: getFormatColor() }]}>
          <Ionicons name={getFormatIcon() as any} size={16} color="white" />
          <Text style={styles.formatText}>{formatDisplayName} Mode</Text>
        </View>
      </View>

      {/* Camera Viewfinder Simulation */}
      <View style={styles.cameraContainer}>
        <View style={styles.viewfinder}>
          <View style={[styles.overlayFrame, { borderColor: getFormatColor() }]}>
            <View style={[styles.cornerTopLeft, { borderColor: getFormatColor() }]} />
            <View style={[styles.cornerTopRight, { borderColor: getFormatColor() }]} />
            <View style={[styles.cornerBottomLeft, { borderColor: getFormatColor() }]} />
            <View style={[styles.cornerBottomRight, { borderColor: getFormatColor() }]} />
          </View>
          
          <View style={styles.simulatedTable}>
            {selectedImage ? (
              <View style={styles.uploadedImageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageOverlayText}>Analyzing {formatDisplayName} Table</Text>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.tableText}>🎰 Poker Table View</Text>
                <Text style={styles.instructionText}>
                  Position your phone to capture the {formatDisplayName.toLowerCase()} table
                </Text>
                <Text style={styles.formatHint}>
                  {selectedFormat === 'cash' 
                    ? 'Optimized for deep stack analysis' 
                    : 'Optimized for short stack decisions'
                  }
                </Text>
              </>
            )}
          </View>

          {/* Analysis Overlay */}
          {isAnalyzing && (
            <View style={styles.analysisOverlay}>
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                  {selectedImage ? 'Analyzing uploaded image...' : `Analyzing ${formatDisplayName}...`}
                </Text>
                <View style={styles.loadingBar}>
                  <View style={[styles.loadingProgress, { backgroundColor: getFormatColor() }]} />
                </View>
              </View>
            </View>
          )}

          {/* Decision Display */}
          {lastAnalysis && !isAnalyzing && (
            <View style={styles.decisionOverlay}>
              <View style={[styles.decisionContainer, { borderColor: getFormatColor() }]}>
                <Text style={[styles.decisionText, { color: getFormatColor() }]}>
                  {lastAnalysis.decision}
                </Text>
                <Text style={styles.confidenceText}>
                  Confidence: {lastAnalysis.confidence}%
                </Text>
                <Text style={styles.reasoningText}>
                  {lastAnalysis.reasoning}
                </Text>
                {lastAnalysis.alternatives && lastAnalysis.alternatives.length > 0 && (
                  <View style={styles.alternativesContainer}>
                    <Text style={styles.alternativesLabel}>Alternatives:</Text>
                    <Text style={styles.alternativesText}>
                      {lastAnalysis.alternatives.join(', ')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.topControls}>
          <TouchableOpacity 
            style={[
              styles.autoButton,
              autoCapture && { ...styles.autoButtonActive, backgroundColor: getFormatColor() },
              { borderColor: getFormatColor() }
            ]}
            onPress={toggleAutoCapture}
          >
            <Ionicons 
              name={autoCapture ? "stop-circle" : "play-circle"} 
              size={24} 
              color={autoCapture ? "white" : getFormatColor()} 
            />
            <Text style={[
              styles.autoButtonText,
              autoCapture && styles.autoButtonTextActive,
              !autoCapture && { color: getFormatColor() }
            ]}>
              {autoCapture ? 'Stop Auto' : 'Auto Capture'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity 
            style={styles.galleryButton}
            onPress={handleImageUpload}
          >
            <Ionicons name="images" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.captureButton,
              { backgroundColor: getFormatColor() },
              isAnalyzing && styles.captureButtonDisabled
            ]}
            onPress={handleTakePhoto}
            disabled={isAnalyzing}
          >
            <View style={styles.captureInner}>
              {isAnalyzing ? (
                <View style={styles.captureLoading} />
              ) : (
                <Ionicons name="camera" size={32} color="white" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Format-Specific Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2.3s</Text>
          <Text style={styles.statLabel}>Avg Analysis</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>94%</Text>
          <Text style={styles.statLabel}>Recognition</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {selectedFormat === 'cash' ? '127' : '89'}
          </Text>
          <Text style={styles.statLabel}>
            {selectedFormat === 'cash' ? 'Decisions' : 'Push/Folds'}
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
  },
  formatIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  formatText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  formatHint: {
    color: '#666',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    maxWidth: 250,
  },
  cameraContainer: {
    flex: 1,
    marginTop: 50,
  },
  viewfinder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayFrame: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    bottom: 150,
    borderWidth: 2,
    borderRadius: 12,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  simulatedTable: {
    alignItems: 'center',
  },
  tableText: {
    fontSize: 24,
    marginBottom: 35,
    color: "white"
  },
  instructionText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 250,
  },
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  loadingBar: {
    width: 150,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '60%',
    height: '100%',
    borderRadius: 2,
  },
  decisionOverlay: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  decisionContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  decisionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  confidenceText: {
    color: 'white',
    fontSize: 14,
  },
  reasoningText: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  alternativesContainer: {
    alignItems: 'center',
  },
  alternativesLabel: {
    color: '#999',
    fontSize: 14,
    marginBottom: 2,
  },
  alternativesText: {
    color: '#ccc',
    fontSize: 14,
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  topControls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  autoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  autoButtonActive: {
    backgroundColor: '#1a73e8', // Will be overridden by getFormatColor()
  },
  autoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  autoButtonTextActive: {
    color: 'white',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonDisabled: {
    backgroundColor: '#666',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureLoading: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    borderTopColor: 'transparent',
  },
  settingsButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 4,
  },
  uploadedImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  imageOverlayText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 