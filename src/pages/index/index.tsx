import Taro, { Component, Config } from '@tarojs/taro'
import { CommonEvent } from '@tarojs/components/types/common';
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import iconAction from '../../assets/images/icon-list-action.png';
import iconBasic from '../../assets/images/icon-list-basic.png';
import iconForm from '../../assets/images/icon-list-form.png';
import iconHOC from '../../assets/images/icon-list-hoc.png';
import iconLayout from '../../assets/images/icon-list-layout.png';
import iconNavigation from '../../assets/images/icon-list-navigation.png';
import iconView from '../../assets/images/icon-list-view.png';
import logoImg from '../../assets/images/logo_tc.png';
import AtButton from '../../components/AtButton/AtButton';

interface IndexState {
  list: {
    id: string
    title: string
    content: string
    icon: string
    subpages?: any
  }[]
}

export default class Index extends Component<{}, IndexState> {

  public constructor() {
    super(...arguments)

    this.state = {
      list: [
        {
          id: 'Basic',
          title: '基础',
          content: '包含颜色、文本、图标等',
          icon: iconBasic
        },
        {
          id: 'View',
          title: '视图',
          content: '包含通告栏、标签、徽标等',
          icon: iconView
        },
        {
          id: 'Action',
          title: '操作反馈',
          content: '包含对话框、进度条、动作面板等',
          icon: iconAction
        },
        {
          id: 'Form',
          title: '表单',
          content: '包含输入框、单选框、复选框等',
          icon: iconForm
        },
        {
          id: 'Layout',
          title: '布局',
          content: '包含列表、浮层、卡片等',
          icon: iconLayout
        },
        {
          id: 'Navigation',
          title: '导航',
          content: '包含标签栏、导航栏、分段器等',
          icon: iconNavigation
        }, {
          id: 'Advanced',
          title: '高阶组件',
          content: '包含日历等',
          icon: iconHOC
        }
      ]
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  private gotoPanel = (e: CommonEvent): void => {
    const { id } = e.currentTarget.dataset
    Taro.navigateTo({
      url: `/pages/panel/index?id=${id.toLowerCase()}`
    })
  }


  public render (): JSX.Element {
    const { list } = this.state
    return (
      <View className='page page-index'>
        <View className='logo'>
          <Image src={logoImg} className='img' mode='widthFix' />
        </View>
        <View className='page-title'>Ship Taro UI</View>
        <View className='module-list'>
          {list.map((item, index) => (
            <View
              className='module-list__item'
              key={index}
              data-id={item.id}
              data-name={item.title}
              data-list={item.subpages}
              onClick={this.gotoPanel}
            >
              <View className='module-list__icon'>
                <Image src={item.icon} className='img' mode='widthFix' />
              </View>
              <View className='module-list__info'>
                <View className='title'>{item.title}</View>
                <View className='content'>{item.content}</View>
              </View>
              <View className='module-list__arrow'>
                <Text className='at-icon at-icon-chevron-right' />
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
