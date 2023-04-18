import { Image, StyleSheet, Text, View } from 'react-native'

const RepositoryItem = ({ repo }) => {
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
            width: '90%',
        },
        language: {
            color: 'white',
            backgroundColor: 'blue',
            borderRadius: 10,
            padding: 10,
            alignSelf: 'flex-start',
            margin: 5,
        },
    })

    return (
        <View style={styles.containerTopBottom}>
            <View style={styles.headerImageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: repo.ownerAvatarUrl }}
                ></Image>
                <View style={styles.headerContainer}>
                    <Text style={styles.fullName}>{repo.fullName}</Text>
                    <Text style={styles.description}>{repo.description}</Text>
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
        </View>
    )
}
export default RepositoryItem
