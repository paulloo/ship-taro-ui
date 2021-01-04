import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

interface testScrollViewProps {

}
interface testScrollViewState {
    scrollLeft: number;
}
export default class testScrollView extends Taro.Component<testScrollViewProps, testScrollViewState> {

    constructor(props: testScrollViewProps) {
        super(props)
        this.state = {
            scrollLeft: 100
        }
    }


    render(): JSX.Element {
        console.log("this.state.scrollLeft: ", this.state.scrollLeft)
        return (
            <ScrollView scrollX scrollLeft={this.state.scrollLeft} style={{whiteSpace: 'nowrap', position: "fixed", top: 0, left: 0, right: 0, zIndex: 9099}}>
            横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动横向滚动
          </ScrollView>
        )
    }
}