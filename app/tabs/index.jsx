
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  TextInput, 
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { auth } from '../../config/firebase';
// import { signOut } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

export default function HomeScreen ()  {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
  // const { top } = useSafeAreaInsets();
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Animations
  const searchWidth = useRef(new Animated.Value(width - 40)).current;

  // Categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'bacterial', name: 'Bacterial' },
    { id: 'fungal', name: 'Fungal' },
    { id: 'viral', name: 'Viral' },
    { id: 'pest', name: 'Pests' }
  ];

  // Disease data with descriptions, prevention methods, categories, and icons
  const diseases = [
    {
      id: '1',
      name: 'Bacterial Leaf Blight',
      category: 'Bacterial',
      color: '#FFD6D6', // Light red background
      icon: '',
      shortDescription: 'A serious disease affecting rice leaves',
      fullDescription: 'Bacterial leaf blight is a destructive bacterial disease of rice caused by Xanthomonas oryzae pv. oryzae. It causes wilting of seedlings and yellowing and drying of leaves.',
      symptoms: [
        'Water-soaked lesions on leaf margins',
        'Lesions turn yellow to white as they expand',
        'Leaves become grayish-white and eventually die',
        'Can affect plants at any growth stage'
      ],
      prevention: [
        'Use resistant rice varieties',
        'Treat seeds with hot water before planting',
        'Maintain field sanitation',
        'Apply balanced fertilizer'
      ]
    },
    {
      id: '2',
      name: 'Brown Spot',
      category: 'Fungal',
      color: '#E8D5B5', // Light brown background
      icon: '',
      shortDescription: 'Common fungal disease affecting rice production',
      fullDescription: 'Brown spot disease, caused by the fungus Cochliobolus miyabeanus, is one of the most common and widespread diseases of rice. It causes significant yield loss and affects grain quality.',
      symptoms: [
        'Small, circular to oval brown lesions on leaves',
        'Dark brown spots with gray centers',
        'Infected grains show brown spots',
        'Reduced seed germination'
      ],
      prevention: [
        'Use disease-free seeds',
        'Apply appropriate fungicides',
        'Maintain balanced soil nutrients',
        'Practice crop rotation'
      ]
    },
    {
      id: '3',
      name: 'Healthy',
      category: 'Reference',
      color: '#D6FFDB', // Light green background
      icon: '',
      shortDescription: 'Characteristics of healthy rice plants',
      fullDescription: 'Healthy rice plants show vibrant green color, strong stems, and uniform growth. Recognizing healthy plants is key to early disease detection.',
      symptoms: [
        'Vibrant green leaves without spots or lesions',
        'Strong erect stems',
        'Uniform growth pattern',
        'Well-developed root system'
      ],
      prevention: [
        'Regular monitoring of plants',
        'Balanced fertilization',
        'Proper water management',
        'Integrated pest management'
      ]
    },
    {
      id: '4',
      name: 'Leaf Blast',
      category: 'Fungal',
      color: '#D5E8D4', // Light greenish-gray background
      icon: '',
      shortDescription: 'Major fungal disease affecting rice leaves',
      fullDescription: 'Rice blast, caused by the fungus Magnaporthe oryzae, is one of the most destructive diseases of rice worldwide. It affects leaves causing typical diamond-shaped lesions.',
      symptoms: [
        'Diamond-shaped lesions on leaves',
        'Gray centers with brown margins',
        'Lesions may coalesce causing entire leaf to die',
        'Reduced photosynthesis and yield'
      ],
      prevention: [
        'Plant resistant varieties',
        'Avoid excessive nitrogen fertilization',
        'Apply fungicides preventively',
        'Proper spacing between plants'
      ]
    },
    {
      id: '5',
      name: 'Leaf Scald',
      category: 'Fungal',
      color: '#FFF2CC', // Light yellow background
      icon: '',
      shortDescription: 'Fungal disease affecting rice leaf tips',
      fullDescription: 'Leaf scald is caused by the fungus Microdochium oryzae. It affects rice leaves starting from the tips and margins, causing characteristic zonate lesions.',
      symptoms: [
        'Zonate lesions with alternating light and dark brown bands',
        'Starts from leaf tips and margins',
        'Lesions expand and cause leaf drying',
        'Most severe during flowering stage'
      ],
      prevention: [
        'Use disease-free seeds',
        'Balanced fertilization',
        'Proper water management',
        'Apply appropriate fungicides'
      ]
    },
    {
      id: '6',
      name: 'Narrow Brown Spot',
      category: 'Fungal',
      color: '#E6D0DE', // Light purple background
      icon: '',
      shortDescription: 'Disease characterized by narrow brown lesions',
      fullDescription: 'Narrow brown spot, caused by the fungus Cercospora janseana, is characterized by distinct narrow, long brown lesions parallel to the leaf veins.',
      symptoms: [
        'Narrow brown lesions parallel to leaf veins',
        'Short, linear brown lesions on leaf sheaths',
        'Brown discoloration on hulls',
        'Reduces grain quality and yield'
      ],
      prevention: [
        'Plant resistant varieties',
        'Apply fungicides when necessary',
        'Proper field sanitation',
        'Balanced fertilization'
      ]
    },
    {
      id: '7',
      name: 'Neck Blast',
      category: 'Fungal',
      color: '#F8CECC', // Pinkish background
      icon: '',
      shortDescription: 'Severe form of blast affecting the panicle neck',
      fullDescription: 'Neck blast is a serious form of rice blast disease caused by Magnaporthe oryzae that affects the panicle neck, leading to significant yield losses as it prevents grain filling.',
      symptoms: [
        'Brown lesions at the panicle neck',
        'Rotting of the neck region',
        'Whitish or unfilled grains',
        'Panicles break at the infected point'
      ],
      prevention: [
        'Use resistant varieties',
        'Apply preventive fungicides',
        'Split application of nitrogen',
        'Early planting to avoid peak disease periods'
      ]
    },
    {
      id: '8',
      name: 'Rice Hispa',
      category: 'Pest',
      color: '#DAE8FC', // Light blue background
      icon: '',
      shortDescription: 'Insect pest causing characteristic feeding damage',
      fullDescription: 'Rice hispa is an insect pest (Dicladispa armigera) that causes characteristic feeding damage on rice leaves. Both adults and larvae feed on leaf tissues.',
      symptoms: [
        'Scraping of green leaf tissue leaving white streaks',
        'Transparent window-like patches on leaves',
        'Whitish blotches along leaf margins',
        'Reduced photosynthesis and yield'
      ],
      prevention: [
        'Early planting to avoid peak infestation periods',
        'Use resistant varieties',
        'Apply appropriate insecticides',
        'Remove alternative hosts near rice fields'
      ]
    },
    {
      id: '9',
      name: 'Sheath Blight',
      category: 'Fungal',
      color: '#E1D5E7', // Light lavender background
      icon: '',
      shortDescription: 'Major fungal disease affecting leaf sheaths',
      fullDescription: 'Sheath blight is caused by the fungus Rhizoctonia solani and is one of the most economically important rice diseases. It affects leaf sheaths, stems, and leaves.',
      symptoms: [
        'Oval or irregular greenish-gray lesions on leaf sheaths',
        'Lesions with grayish center and brown margins',
        'Lesions may coalesce affecting entire plant',
        'Premature death of leaves and reduced grain filling'
      ],
      prevention: [
        'Use moderately resistant varieties',
        'Apply fungicides at early infection stages',
        'Avoid dense planting',
        'Balanced fertilization, avoiding excess nitrogen'
      ]
    },
    {
      id: '10',
      name: 'Tungro',
      category: 'Viral',
      color: '#FFF4CD', // Light gold background
      icon: '',
      shortDescription: 'Viral disease transmitted by leafhoppers',
      fullDescription: 'Rice tungro disease is caused by a complex of two viruses (Rice tungro bacilliform virus and Rice tungro spherical virus) and transmitted by green leafhoppers. It is one of the most damaging viral diseases of rice in Southeast Asia.',
      symptoms: [
        'Yellow to orange discoloration of leaves',
        'Stunted growth and reduced tillering',
        'Delayed flowering',
        'Significant yield reduction'
      ],
      prevention: [
        'Use resistant varieties',
        'Control leafhopper vectors with appropriate insecticides',
        'Adjust planting time to avoid peak vector activity',
        'Rogue out infected plants early'
      ]
    }
  ];

  // Animation for search bar focus
  useEffect(() => {
    Animated.timing(searchWidth, {
      toValue: width - 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [searchFocused]);

  // Filter diseases based on search query and active category
  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = 
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      activeCategory === 'All' || 
      disease.category.toLowerCase() === activeCategory.toLowerCase();
      
    return matchesSearch && matchesCategory;
  });

  const handleDiseasePress = (disease) => {
    setSelectedDisease(disease);
    setModalVisible(true);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item.name && styles.categoryItemActive
      ]}
      onPress={() => setActiveCategory(item.name)}
    >
      <Text 
        style={[
          styles.categoryText,
          activeCategory === item.name && styles.categoryTextActive
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderDiseaseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.diseaseCard}
      onPress={() => handleDiseasePress(item)}
      activeOpacity={0.8}
    >
      <View style={[styles.diseaseIconContainer, { backgroundColor: item.color }]}>
        <Text style={styles.diseaseIcon}>{item.icon}</Text>
      </View>
      <View style={styles.diseaseContent}>
        <Text style={styles.diseaseName}>{item.name}</Text>
        <Text style={styles.diseaseCategory}>{item.category}</Text>
        <Text style={styles.diseaseDescription} numberOfLines={2}>
          {item.shortDescription}
        </Text>
        <View style={styles.diseaseFooter}>
          <View style={styles.diseaseTagContainer}>
            <View style={[styles.diseaseTag, { backgroundColor: item.color + '80' }]}>
              <Text style={styles.diseaseTagText}>{item.category}</Text>
            </View>
          </View>
          <Text style={styles.readMore}>Details →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const DiseaseDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalIndicator} />
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {selectedDisease && (
              <>
                <View style={[styles.diseaseHeaderCard, { backgroundColor: selectedDisease.color }]}>
                  <View style={styles.diseaseHeaderContent}>
                    <Text style={styles.diseaseHeaderIcon}>{selectedDisease.icon}</Text>
                    <Text style={styles.diseaseHeaderTitle}>{selectedDisease.name}</Text>
                    <View style={styles.diseaseHeaderCategory}>
                      <Text style={styles.diseaseHeaderCategoryText}>{selectedDisease.category}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.diseaseSection}>
                  <Text style={styles.diseaseDescription}>{selectedDisease.fullDescription}</Text>
                </View>
                
                <View style={styles.diseaseSection}>
                  <Text style={styles.sectionTitle}>Symptoms</Text>
                  {selectedDisease.symptoms.map((symptom, index) => (
                    <View key={index} style={styles.symptomItem}>
                      <View style={[styles.symptomDot, { backgroundColor: selectedDisease.color }]} />
                      <Text style={styles.symptomText}>{symptom}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.diseaseSection}>
                  <Text style={styles.sectionTitle}>Prevention & Control</Text>
                  {selectedDisease.prevention.map((method, index) => (
                    <View key={index} style={styles.preventionItem}>
                      <Text style={styles.preventionNumber}>{index + 1}</Text>
                      <Text style={styles.preventionText}>{method}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top > 0 ? top + 5 : 30 }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Plant Guard</Text>
        <Text style={styles.headerSubtitle}>Your plants health dashboard</Text>
      </View>

      <View style={styles.searchAndScanContainer}>
        <Animated.View style={[styles.searchContainer, { width: searchWidth }]}>
          <View style={styles.searchIconContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search plant diseases..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholderTextColor="#7C7C7C"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearch}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearSearchText}>✕</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <View style={styles.diseaseListContainer}>
        <FlatList
          data={filteredDiseases}
          renderItem={renderDiseaseItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.diseaseList}
          ListEmptyComponent={
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <Text style={styles.noResultsTitle}>No Results Found</Text>
              <Text style={styles.noResultsDescription}>
                We couldn't find any diseases matching your search criteria
              </Text>
              <TouchableOpacity
                style={styles.resetSearchButton}
                onPress={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                <Text style={styles.resetSearchText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <DiseaseDetailModal />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#494949',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  searchAndScanContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIconContainer: {
    marginRight: 10,
  },
  searchIcon: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#494949',
    height: '100%',
  },
  clearSearch: {
    padding: 6,
  },
  clearSearchText: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  // Categories
  categoryContainer: {
    marginBottom: 15,
  },
  categoryList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  categoryItemActive: {
    backgroundColor: '#00c26f',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#494949',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  // Disease List
  diseaseListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  diseaseList: {
    paddingBottom: 20,
  },
  diseaseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  diseaseIconContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diseaseIcon: {
    fontSize: 36,
  },
  diseaseContent: {
    flex: 1,
    padding: 15,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#494949',
    marginBottom: 2,
  },
  diseaseCategory: {
    fontSize: 12,
    color: '#7C7C7C',
    marginBottom: 4,
  },
  diseaseDescription: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 10,
    lineHeight: 18,
  },
  diseaseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diseaseTagContainer: {
    flexDirection: 'row',
  },
  diseaseTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  diseaseTagText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#494949',
  },
  readMore: {
    fontSize: 12,
    fontWeight: '500',
    color: '#00c26f',
  },
  // No Results
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    height: 300,
  },
  noResultsIcon: {
    fontSize: 48,
    color: '#E0E0E0',
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#494949',
    marginBottom: 8,
  },
  noResultsDescription: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 20,
  },
  resetSearchButton: {
    backgroundColor: '#00c26f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  resetSearchText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  // Disease Detail Modal
  diseaseHeaderCard: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  diseaseHeaderContent: {
    padding: 20,
    alignItems: 'center',
  },
  diseaseHeaderIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  diseaseHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#494949',
    textAlign: 'center',
    marginBottom: 5,
  },
  diseaseHeaderCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  diseaseHeaderCategoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#494949',
  },
  diseaseSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#494949',
    marginBottom: 12,
  },
  symptomItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  symptomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 10,
  },
  symptomText: {
    flex: 1,
    fontSize: 15,
    color: '#494949',
    lineHeight: 20,
  },
  preventionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  preventionNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#00c26f',
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  preventionText: {
    flex: 1,
    fontSize: 15,
    color: '#494949',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#00c26f',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});