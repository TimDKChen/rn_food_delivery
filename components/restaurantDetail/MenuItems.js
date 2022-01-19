import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    titleStyle: {
        fontSize: 16,
        fontWeight: "bold",
    }
});

const FoodInfo = (props) => (
    <View style={{ width: 234, justifyContent: "space-evenly" }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>    
);

const FoodImage = ({ marginLeft, ...props }) => (
    <View>
        <Image
            source={{ uri: props.food.image }}
            style={{
                width: 90,
                height: 90,
                borderRadius: 6,
                marginLeft: marginLeft,
            }}
        />
    </View>
);

export default function MenuItems({ restaurantName, foods, hideCheckbox, marginLeft }) {
    const dispatch = useDispatch();
    const selectItem = (item, checkboxValue) =>
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                ...item,
                restaurantName: restaurantName,
                checkboxValue: checkboxValue,
            },
        });
    const cartItems = useSelector(
        (state) => state.cartReducer.selectedItems.items
    );

    const isFoodInCart = (food, cartItems) => 
        Boolean(cartItems.find((item) => item.title === food.title));

    return (
        <>
            {foods.map((food, index) => (
                <View key={index} style={{ margin: 6 }}>
                    <View style={styles.menuItemStyle}>
                        {hideCheckbox ? (
                            <></>
                        ): (
                            <BouncyCheckbox
                                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                                fillColor="green"
                                isChecked={isFoodInCart(food, cartItems)}
                                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                            />
                        )}
                        <FoodInfo food={food} />
                        <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
                    </View>
                    <Divider width={0.5} />
                </View>
            ))}
            {hideCheckbox === false && <View style={{ margin: 6, height: 120 }}></View>}
        </>
    )
}
