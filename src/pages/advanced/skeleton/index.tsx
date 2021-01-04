import Taro from '@tarojs/taro'
import { View, Text, Switch, Image, Button } from '@tarojs/components'

import DocsHeader from '../../components/doc-header'
import Skeleton from '../../../components/Skeleton/Skeleton'

import './index.scss'

interface SkeletonState {
    loading: boolean;
}

export default class skeleton extends Taro.Component<{}, SkeletonState> {

  public constructor () {
    super()

    this.state = {
        loading: true
    }
  }

  public config: Taro.PageConfig = {
    navigationBarTitleText: 'Taro UI'
  }

  public render (): JSX.Element {
    return (
      <View className='page'>
        {/* S Header */}
        <DocsHeader title='skeleton 骨架屏'></DocsHeader>
        {/* E Header */}

        {/* S Body */}
        <View className='doc-body'>
        <View className='panel'>
                <View className='panel__title'>标题</View>
                <View className='panel__content'>
                <Text>船票首页banner</Text>
                <Skeleton row={2} rowWidth={['100%', '100%']} rowHeight={['100px', '100px']} ></Skeleton>

                <Text>船票首页热门航线</Text>
                
                <Skeleton row={2} rowWidth={['50%', '50%']} rowHeight={['150px']} ></Skeleton>


                <Text>船票首页城市航线选择</Text>
                <Skeleton matrix={[
                    [2,1,2],
                    [1],
                    [1]
                ]}
                ></Skeleton>
                <Text>船票班次列表日历</Text>
                <View className='column-skeleton'>
                    <Skeleton type='column' row={5} rowWidth={['16%', '16%', '16%', '16%', '16%']} rowHeight={['50px', '50px', '50px', '50px', '50px']}></Skeleton>
                </View>
                <Text>船票班次列表</Text>
                <Skeleton matrix={[
                    [2,2,2,1],
                    [2,2,2]
                ]}
                ></Skeleton>

                <Switch onChange={value => {
                    console.log('value', value);
                    this.setState({
                        loading: !value.detail.value
                    })
                }}
                >显示子组件内容</Switch>
                <Skeleton loading={this.state.loading} row={2} rowWidth={['90%', '50%']}>
                    <View className='item'>
                        <View className='item-img'>
                        <Image className='item-img' src='https://iconfont.alicdn.com/t/1536041894220.jpg@100h_100w.jpg'></Image>
                        </View>
                        <View className='item-info'>
                        <View className='item-info-title'>Skeleton 骨架屏</View>
                        <View className='item-info-desc'>Skeleton 骨架屏 简单易用</View>
                        </View>
                        <View >
                        <Button type='primary' className='item-btn'>操作</Button>
                        </View>
                    </View>
                </Skeleton>

                </View>
        </View>
        </View>
        {/* E Body */}
      </View>
    )
  }
}
