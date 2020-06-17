import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';



function ProductDisplay() {

  // 一開始就會開始載入資料
  useEffect(() => {
    const menus = document.querySelectorAll('.cool > li');
		const dropdownBackground = document.querySelector('.dropdownBackground');

		function enterHandler() {
			this.classList.add('trigger-enter');
			setTimeout(() => {
				this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active');
			}, 100)
			const dropdown = this.querySelector('.dropdown');
			const rect = dropdown.getBoundingClientRect();
			const navRect = document.querySelector('.top').getBoundingClientRect();
			console.log(rect);

			dropdownBackground.classList.add('open');
			dropdownBackground.style.width = rect.width + 'px';
			dropdownBackground.style.height = rect.height + 'px';
			dropdownBackground.style.top = rect.top - navRect.top + 'px';
			dropdownBackground.style.left = rect.left - navRect.left + 'px';

		}
		function leaveHandler() {
			this.classList.remove('trigger-enter');
			this.classList.remove('trigger-enter-active');
			dropdownBackground.classList.remove('open');
		}

		menus.forEach(menu => {
			menu.addEventListener('mouseenter', enterHandler);
			menu.addEventListener('mouseleave', leaveHandler);
		})
    
	}, []);


  return (
    <>
      <div id="appAAA">
        <section className="Page1">
          <h1>
            Simple style
          </h1>
          <nav className="top">
            <div className="dropdownBackground">
              <span className="arrow"></span>
            </div>

            <ul className="cool">
              <li>
                <a href="#" className="firstPart">沙發</a>
                <div className="dropdown dropdown1">
                  <div className="bio">
                    <img src={require('../img/sofa.jpg')} />
                    <p>
                      <h2 style={{ 'textAlign':'center' }}>gunnared米色沙發</h2>
                      身為主人的第一課：隨時為臨時出現的客人做好準備！排放沙發時保留些彈性空間，讓臨時加入的好
                      友坐下一起暢聊。讓忙碌的生活增添一點舒適吧。
                    </p>
                  </div>
                </div>
              </li>

            
              <li>
                <a href="#">檯燈</a>
                <div className="dropdown dropdown2">
                  <div className="bio">
                    <img src={require('../img/tableLamp.jpg')} />
                    <p>
                      <h2 style={{ 'textAlign':'center' }}>FUBBLA工作燈</h2>
                      在晚間時刻想要工作、閱讀或是學習，又覺得房間內燈光不太夠的話，通常都會準備檯燈來使用，尤其是近年來技術進步，耗電量低，使用壽命也長的 LED 檯燈也開始成為市場上的主流商品。
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <a href="#">抱枕</a>
                
                <div className="dropdown dropdown3">
                  <div className="bio">
                    <a href="http://localhost:3000/productList/66"><img src={require('../img/pillow.jpg')} /></a>
                    <p>
                      <h2 style={{ 'textAlign':'center' }}>DVALA枕頭</h2>
                      人的一天不管怎麼過，一定都避免不了睡眠這件事情，疲勞的身體需要休息，才能好好的往明天邁進！想要睡眠品質好，一個好的枕頭是生活必需品。
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            
          </nav>
        </section>


        <section className="Page2">
          <h1>European style</h1>
          <nav className="top">
          <div className="dropdownBackground">
            <span className="arrow"></span>
          </div>

          <ul className="cool">
            <li>
              <a href="#" className="firstPart">椅子</a>
              <div className="dropdown dropdown1">
                <div className="bio">
                  <img src={require('../img/chair2Ader.jpg')} />
                  <p>身為主人的第一課：隨時為臨時出現的客人做好準備！排放座椅時保留些彈性空間，讓臨時加入的好
                  友坐下一起暢聊。可堆疊的椅子不但節省空間，隨時拿出來增添座位，特別適合派對聚會。混搭幾張
                  長凳，大家坐近些就能多出個空位；飯後把長凳推到牆邊，跳舞跳累了，坐下休息一下吧。</p>
                </div>
              </div>
            </li>

            <li>
              <a href="#">盆栽</a>
              <div className="dropdown dropdown2">
                <div className="bio">
                  <img src={require('../img/Potted.jpg')} />
                  <p>
                    打造派對餐桌時，試著從立體角度思考，添加位於上方的裝飾；結合慶祝主題，室內造型師 Ashlyn Gibson 在桌子長端上方懸掛一條細繩，沿著繩子固定花朵，讓客人們一到場就能感受到歡樂氣氛。貼心小秘訣，試試用人造花，整個季節都能重複使用！
                  </p>
                </div>
              </div>
            </li>

            <li>
              <a href="#">桌子</a>
              <div className="dropdown dropdown3">
                <div className="bio">
                  <img src={require('../img/tableAder.jpg')} />
                  <p>
                    餐桌是派對的視覺焦點，鋪上桌巾，簡單卻印象深刻；根據主題選定桌巾，整場派對立刻活了起來。派對時光通常需要多幾張桌子，使用不同圖紋的桌巾來裝飾餐桌，簡單、大膽又充滿樂趣！
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </section>

        <section className="Page3">
            <h1>Farmhouse style</h1>
            <nav className="top">
            <div className="dropdownBackground">
              <span className="arrow"></span>
            </div>

            <ul className="cool">
              <li>
                <a href="#" className="firstPart">椅子</a>
                <div className="dropdown dropdown1">
                  <div className="bio">
                    <img src={require('../img/chair3Ader.jpg')} />
                    <p>身為主人的第一課：隨時為臨時出現的客人做好準備！排放座椅時保留些彈性空間，讓臨時加入的好
                    友坐下一起暢聊。可堆疊的椅子不但節省空間，隨時拿出來增添座位，特別適合派對聚會。混搭幾張
                    長凳，大家坐近些就能多出個空位；飯後把長凳推到牆邊，跳舞跳累了，坐下休息一下吧。</p>
                  </div>
                </div>
              </li>

              <li>
                <a href="#">盆栽</a>
                <div className="dropdown dropdown2">
                  <div className="bio">
                    <img src={require('../img/Potted3.jpg')} />
                    <p>
                      打造派對餐桌時，試著從立體角度思考，添加位於上方的裝飾；結合慶祝主題，室內造型師 Ashlyn Gibson 在桌子長端上方懸掛一條細繩，沿著繩子固定花朵，讓客人們一到場就能感受到歡樂氣氛。貼心小秘訣，試試用人造花，整個季節都能重複使用！
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <a href="#">桌子</a>
                <div className="dropdown dropdown2">
                  <div className="bio">
                    <img src={require('../img/Potted3.jpg')} />
                    <p>
                      打造派對餐桌時，試著從立體角度思考，添加位於上方的裝飾；結合慶祝主題，室內造型師 Ashlyn Gibson 在桌子長端上方懸掛一條細繩，沿著繩子固定花朵，讓客人們一到場就能感受到歡樂氣氛。貼心小秘訣，試試用人造花，整個季節都能重複使用！
                    </p>
                  </div>
                </div>
              </li>


              
            </ul>
            
          </nav>
        </section>
      </div>
    </>
  )
}

export default withRouter(ProductDisplay);