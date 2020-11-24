## Specifying options

            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Overview' }}
            />

## Passing additional props#

Sometimes we might want to pass additional props to a screen. We can do that with 2 approaches:

1.  **Use React context** and `wrap the navigator with a context provider to pass data to the screens` (recommended).

2.  Use a `render callback for the screen` instead of specifying a component prop:

        <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={someData} />}
        </Stack.Screen>

### Note:

By default, React Navigation applies optimizations to screen components to prevent unnecessary renders. Using a `render callback removes those optimizations`. So if you use a render callback, you'll need to ensure that you use `React.memo or React.PureComponent` for your screen components to avoid performance issues.

## Navigating to a new screen

1. **navigation** - the `navigation prop is passed in to every screen component` (definition) in stack navigator (more about this later in "The navigation prop in depth").
2. **navigate('Details')** - we call the navigate function (on the navigation prop — naming is hard!) with the name of the route that we'd like to move the user to.

## Navigate to a route multiple times

            function DetailsScreen({ navigation }) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Details Screen</Text>
                    <Button
                        title="Go to Details... again"
                        onPress={() => navigation.navigate('Details')}
                    />
                    </View>
                );
            }

1.  when you tap "Go to Details... again" that it doesn't do anything! This is because we are already on the Details route. The navigate function roughly means "go to this screen", and `if you are already on that screen then it makes sense that it would do nothing`.
2.  Let's suppose that we actually `want to add another details screen`. This is pretty common in cases where you `pass in some unique data to each route` (more on that later when we talk about params!). To do this, we can `change navigate to push`. This allows us to express the intent to add another route regardless of the existing navigation history.

            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details')}
            />

## Going back

1.  `The header provided by stack navigator will automatically include a back button when it is possible `to go back from the active screen (if there is only one screen in the navigation stack, there is nothing that you can go back to, and so there is no back button).

2.  `Sometimes you'll want to be able to programmatically trigger` this behavior, and for that you can use `navigation.goBack();`

            function DetailsScreen({ navigation }) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Details Screen</Text>
                    <Button
                        title="Go to Details... again"
                        onPress={() => navigation.push('Details')}
                    />
                    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                    <Button title="Go back" onPress={() => navigation.goBack()} />
                    </View>
                );
            }

## Going Back to first Screen

`navigation.popToTop()`

## Passing parameters to routes

There are two pieces to this:

1.  Pass params to a route by putting them in an object as a second parameter to the `navigation.navigate` `function: navigation.navigate('RouteName', { /* params go here */ })`

2.  Read the params in your screen `component: route.params`.

            function HomeScreen({ navigation }) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Home Screen</Text>
                    <Button
                        title="Go to Details"
                        onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                        }}
                    />
                    </View>
                );
                }

                function DetailsScreen({ route, navigation }) {
                /* 2. Get the param */
                const { itemId, otherParam } = route.params;
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Details Screen</Text>
                    <Text>itemId: {JSON.stringify(itemId)}</Text>
                    <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                    <Button
                        title="Go to Details... again"
                        onPress={() =>
                        navigation.push('Details', {
                            itemId: Math.floor(Math.random() * 100),
                        })
                        }
                    />
                    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                    <Button title="Go back" onPress={() => navigation.goBack()} />
                    </View>
                );
            }

## Updating params

1.  Screens can also update their params, like they can update their state. The `navigation.setParams` method lets you update the params of a screen. **https://reactnavigation.org/docs/navigation-prop/#setparams---make-changes-to-route-params**

2.  Also `pass some initial params to a screen`. If **`you didn't specify any params when navigating to this screen, the initial params will be used`**. They are also shallow merged with any params that you pass. Initial params can be **specified with an `initialParams` prop**:

            <Stack.Screen
                name="Details"
                component={DetailsScreen}
                initialParams={{ itemId: 42 }}
            />

## Passing params to a previous screen

1.  Params aren't only useful for passing some data to a new screen, but they `can also be useful to pass data to a previous screen too`.

    - For example, let's say you have a screen with a create post button, and the create post button opens a new screen to create a post. After creating the post, you want to pass the data for the post back to previous screen.

2.  To achieve this, `you can use the navigate method, which acts like goBack if the screen already exists. You can pass the params with navigate to pass the data back`:

            function HomeScreen({ navigation, route }) {
                React.useEffect(() => {
                    if (route.params?.post) {
                    // Post updated, do something with `route.params.post`
                    // For example, send the post to the server
                    }
                }, [route.params?.post]);

                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        title="Create post"
                        onPress={() => navigation.navigate('CreatePost')}
                    />
                    <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
                    </View>
                );
                }

                function CreatePostScreen({ navigation, route }) {
                const [postText, setPostText] = React.useState('');

                return (
                    <>
                    <TextInput
                        multiline
                        placeholder="What's on your mind?"
                        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                        value={postText}
                        onChangeText={setPostText}
                    />
                    <Button
                        title="Done"
                        onPress={() => {
                        // Pass params back to home screen
                        navigation.navigate('Home', { post: postText });
                        }}
                    />
                    </>
                );
            }
