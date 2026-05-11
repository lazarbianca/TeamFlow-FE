import { mockTeams } from '@/constants/mock-teams';
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PURPLE = '#4B1363';

export default function TeamsScreen() {
    const currentUser = { id: '1', fullName: 'Sarah Chen' };

    const myTeams = useMemo(() => {
        return mockTeams.filter((team) =>
            team.members.includes(currentUser.id)
        );
    }, [currentUser.id]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchDiv}>
                <Text style={styles.title}>Workspaces</Text>

                <TouchableOpacity
                    onPress={() => router.push('/browse-teams')}
                    style={styles.iconButton}
                >
                    <Feather name="edit-2" size={20} color="#4B1363" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={myTeams}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingTop: 12 }}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() => router.push({pathname: "/team-chat/[id]", params: { id: item.id }})}
                    >
                        <Image
                            source={{ uri: item.avatar }}
                            style={styles.avatar}
                        />
                        <Text style={styles.teamName}>{item.name}  &#9654;</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No teams assigned yet.</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    title: { fontSize: 28, fontWeight: '700', color: PURPLE },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 12,
        marginHorizontal: 30,
        alignItems: 'center', // Added to vertically center content
    },
    teamName: { fontSize: 18, fontWeight: '600', color: PURPLE },
    empty: { marginTop: 40, textAlign: 'center', color: '#888' },
    avatar: { width: 40, height: 40, marginRight: 10, borderRadius: 8 },
    iconButton: {
        width: 40, height: 40, borderRadius: 10, borderWidth: 1,
        borderColor: '#000', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#fff',
    },
    searchDiv: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 10, paddingHorizontal: 20,
    }
});