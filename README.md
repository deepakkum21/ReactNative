# ReactNative

## Some Types of touchable ReactNative Components:-

### Touchables#

- If the basic button doesn't look right for your app, you can build your own button using any of the "Touchable" components provided by React Native. The "Touchable" components provide the capability to capture tapping gestures, and can display feedback when a gesture is recognized. These components do not provide any default styling, however, so you will need to do a bit of work to get them looking nicely in your app.

- Which "Touchable" component you use will depend on what kind of feedback you want to provide:

1. **TouchableHighlight**

   - anywhere you would use a button or link on web. The `view's background will be darkened when the user presses down on the button`.

2. **TouchableNativeFeedback**

   - works on `Android to display ink surface reaction ripples that respond to the user's touch`.

3. **TouchableOpacity**

   - can be `used to provide feedback by reducing the opacity of the button`, allowing the background to be seen through while the user is pressing down.
   - can use activeOpacity prop to change the opacity level.

4. **TouchableWithoutFeedbackIf**
   - you need to handle a tap gesture but you `don't want any feedback to be displayed`, use TouchableWithoutFeedback.

- **Note**:- In some cases, you may `want to detect when a user presses and holds a view for a set amount of time`. `These long presses can be handled by passing a function to the onLongPress` props of any of the "Touchable" components.
