import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from '../../components/RepositoryItem'
import { render, screen } from '@testing-library/react-native'
const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryListContainer = ({ repositories }) => {
    const styles = StyleSheet.create({
        container: {
            padding: 8,
            marginBottom: 120,
        },
    })

    const data = repositories

    const repositoryNodes = data ? data.edges.map((edge) => edge.node) : []

    return (
        <View style={styles.container}>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <RepositoryItem repo={item} />}
                keyExtractor={(item) => item.id}
                // other props
            />
        </View>
    )
}

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor:
                        'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description:
                                'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description:
                                'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            }

            const formatNumber = (num) => {
                if (num >= 1000) {
                    return (num / 1000).toFixed(1) + 'k'
                } else {
                    return num
                }
            }

            // Add your test code here
            render(<RepositoryListContainer repositories={repositories} />)
            const repositoryItems = screen.getAllByTestId('repositoryItem')
            const [firstRepositoryItem, secondRepositoryItem] = repositoryItems

            expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik')
            expect(firstRepositoryItem).toHaveTextContent(
                'Build forms in React, without the tears'
            )
            expect(firstRepositoryItem).toHaveTextContent('TypeScript')
            expect(firstRepositoryItem).toHaveTextContent(formatNumber(1619))
            expect(firstRepositoryItem).toHaveTextContent(formatNumber(21856))
            expect(firstRepositoryItem).toHaveTextContent(formatNumber(88))
            expect(firstRepositoryItem).toHaveTextContent(formatNumber(3))

            expect(secondRepositoryItem).toHaveTextContent(
                'async-library/react-async'
            )
            expect(secondRepositoryItem).toHaveTextContent(
                'Flexible promise-based React data loader'
            )
            expect(secondRepositoryItem).toHaveTextContent('JavaScript')
            expect(secondRepositoryItem).toHaveTextContent(formatNumber(69))
            expect(secondRepositoryItem).toHaveTextContent(formatNumber(1760))
            expect(secondRepositoryItem).toHaveTextContent(formatNumber(72))
            expect(secondRepositoryItem).toHaveTextContent(formatNumber(3))
        })
    })
})
