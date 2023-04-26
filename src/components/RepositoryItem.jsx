import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import * as Linking from 'expo-linking'
import { useNavigate } from 'react-router-native'

const RepositoryItem = ({ repo, showButton }) => {
    const navigate = useNavigate()
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k'
        } else {
            return num
        }
    }

    const styles = StyleSheet.create({
        containerTopBottom: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            flexWrap: 'wrap',
        },
        headerImageContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
        headerContainer: {
            display: 'flex',
            flexDirection: 'column',
            margin: 20,
        },
        bottomContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            maxWidth: 400,
        },
        bottominfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        image: {
            width: 60,
            height: 60,
            borderRadius: 10,
            margin: 20,
        },
        fullName: {
            fontWeight: 'bold',
        },
        description: {
            color: 'grey',
            marginTop: 5,
            marginBottom: 5,
            width: 250,
        },
        language: {
            color: 'white',
            backgroundColor: 'blue',
            borderRadius: 10,
            padding: 10,
            alignSelf: 'flex-start',
            margin: 5,
        },
        button: {
            backgroundColor: 'blue',
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'blue',
            padding: 10,
            alignSelf: 'center',
            margin: 5,
            borderRadius: 10,
            width: 400,
        },
    })

    const onPress = (url) => {
        Linking.openURL(url)
    }

    const onView = () => {
        if (!showButton) {
            navigate(`/${repo.id}`)
        }
    }

    return (
        <Pressable onPress={onView}>
            <View style={styles.containerTopBottom} testID='repositoryItem'>
                <View style={styles.headerImageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: repo.ownerAvatarUrl }}
                    ></Image>
                    <View style={styles.headerContainer}>
                        <Text style={styles.fullName}>{repo.fullName}</Text>
                        <Text style={styles.description}>
                            {repo.description}
                        </Text>
                        <Text style={styles.language}>{repo.language}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottominfo}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {formatNumber(repo.stargazersCount)}
                        </Text>
                        <Text color='grey'>Starts</Text>
                    </View>
                    <View style={styles.bottominfo}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {formatNumber(repo.forksCount)}
                        </Text>
                        <Text color='grey'>Forks</Text>
                    </View>
                    <View style={styles.bottominfo}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {formatNumber(repo.reviewCount)}
                        </Text>
                        <Text color='grey'>Reviews</Text>
                    </View>
                    <View style={styles.bottominfo}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {formatNumber(repo.ratingAverage)}
                        </Text>
                        <Text color='grey'>Rating</Text>
                    </View>
                </View>
                {showButton ? (
                    <Pressable
                        onPress={() => {
                            onPress(repo.url)
                        }}
                    >
                        <Text style={styles.buttonText}>Open in GitHub</Text>
                    </Pressable>
                ) : null}
            </View>
        </Pressable>
    )
}
export default RepositoryItem
