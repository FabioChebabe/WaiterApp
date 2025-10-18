import { FlatList } from 'react-native';
import { Text } from '../Text';
import { Container, Icon } from './styles';
import { useState } from 'react';
import { Category } from '../../types/Categories';

interface CategoriesProps {
    categories: Category[];
    onSelectCategory: (categoryId: string) => Promise<void>;
}

const Categories = ({ categories, onSelectCategory }: CategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSelectCategory = (categoryId: string) => {
        const category = selectedCategory === categoryId ? '' : categoryId;

        onSelectCategory(category);
        setSelectedCategory(category);
    };
    return (
        <FlatList
            data={categories}
            keyExtractor={({ _id }) => _id}
            contentContainerStyle={{ paddingRight: 24 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: category }) => (
                <Container onPress={() => handleSelectCategory(category._id)}>
                    <Icon>
                        <Text
                            opacity={
                                selectedCategory === category._id ? 1 : 0.5
                            }
                        >
                            {category.icon}
                        </Text>
                    </Icon>
                    <Text
                        size={14}
                        weight="600"
                        opacity={selectedCategory === category._id ? 1 : 0.5}
                    >
                        {category.name}
                    </Text>
                </Container>
            )}
            horizontal
        />
    );
};

export default Categories;
