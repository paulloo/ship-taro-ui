import Nerv from 'nervjs'
import { renderToString } from 'nerv-server'
import AtBadge from '../../.temp/components/AtBadge/AtBadge'
import AtButton from '../../.temp/components/AtButton/AtButton'

describe('AtBadge Snap', () => {
  it('render AtBadge -- props value', () => {
    const component = renderToString(
      <AtBadge value='3'>
        <AtButton loading>按钮文字</AtButton>
      </AtBadge>
    )
    expect(component).toMatchSnapshot()
  })

  it('render AtBadge -- props dot', () => {
    const component = renderToString(
      <AtBadge dot>
        <AtButton loading>按钮文字</AtButton>
      </AtBadge>
    )
    expect(component).toMatchSnapshot()
  })

  it('render AtBadge -- props maxValue', () => {
    const component = renderToString(
      <AtBadge value='10' maxValue={9}>
        <AtButton loading>按钮文字</AtButton>
      </AtBadge>
    )
    expect(component).toMatchSnapshot()
  })
})
