import React from 'react'
import { Outlet } from 'react-router-dom'
import { BigSidebar, SmallSidebar, Navbar } from '../../components'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const SharedLayout = () => {
  const { isSideBarOpen } = useSelector((state) => state.user)
  return (
    <Wrapper>
      <div>{isSideBarOpen && <SmallSidebar />}</div>

      <div className={!isSideBarOpen ? 'bigScreen' : 'bigScreen-hide'}>
        {!isSideBarOpen && (
          <div className='bigSidebar'>
            <BigSidebar />
          </div>
        )}

        <div className='nav-outlet'>
          <div>
            <Navbar />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background-color: var(--grey-2);
  height: 100vh;
  @media (min-width: 992px) {
    .bigScreen {
      display: grid;
      grid-template-columns: 240px auto;
      .bigScreen-hide {
        display: block;
      }
    }
  }
`
export default SharedLayout
