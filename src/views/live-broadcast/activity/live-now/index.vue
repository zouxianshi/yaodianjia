<template>
  <div class="app-container">
    <div class="live-now-wrapper">
      <div class="shopTop">
        <img class="shopTop_avatar" :src="showImg(LiveDetails.merLogoUrl)">
        <!-- <el-image class="shopTop_avatar" :pp="showImg(LiveDetails.merLogoUrl)" :src="showImg(LiveDetails.merLogoUrl)" :fit="contain" /> -->
        <p class="shopTitle" :pp="showImg(LiveDetails.merLogoUrl)">{{ LiveDetails.merName }}</p>
      </div>
      <div class="containerCenter">
        <div ref="commentBox" class="commentBox">
          <div ref="commentBox_top">
            <div class="flex-left coverbox">
              <img class="comment_avatar" :src="showImg(LiveDetails.coverPicUrl)">
            </div>
            <div class="comment_Title ellipsis_one">{{ LiveDetails.name }}</div>
            <div class="now-people">
              <span>在线人数:</span>
              <span>{{ liveNumber|| '0' }}人</span>
            </div>
            <p class="tips">
              平台公告：
              {{ LiveDetails.businessNotice }}
            </p>
          </div>
          <div ref="box" class="discuss-plan" :style="{height:discuss_plan+'px'}">
            <div>
              <div v-for="items in chatList" :key="items.nick+1" class="flex-left-top discuss-box">
                <div class="flex-left userMsg">
                  <!-- <el-image class="discuss_avatar" :src="url" :fit="contain" /> -->
                  <!-- <img class="discuss_avatar" :src="url"> -->
                  <strong class="ellipsis_one">{{ items.nick||'网友' }}</strong>
                  <span style="font-weight:700">:</span>
                </div>
                <div class="discussConten" style="width:75%">{{ items.payload.text }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="courseBox">
          <!-- <div class="live-state">直播中 ● ● ●</div> -->
          <div class="courseCenter">
            <el-button round class="courseButtom" @click="openCourse">直播教程</el-button>
            <a
              href="https://obsproject.com/download?spm=a2c4g.11186623.2.15.6aac1445JPlKR8"
              target="_blank"
            >
              <el-button round class="courseButtom">下载链接</el-button>
            </a>
            <el-button round class="courseButtom" @click="dialogVisible = true">获取链接</el-button>
            <div class="courseTip">
              开播主播默认同意
              <span class="courseAgreement" @click="courseAgreement = true">《海典软件主播协议》</span>
            </div>
          </div>
        </div>
        <div class="goodsBox">
          <div v-if="iconFlag" class="iconsBox">
            <div class="shareIcon" @click="showGood()">
              <i class="el-icon-s-goods" />
            </div>
            <div class="shareIcon" @click="openShare">
              <i class="el-icon-share" />
            </div>
            <div class="shareIcon" @click="closeLive()">
              <i class="el-icon-switch-button" />
            </div>
          </div>
          <div v-if="goodsListflag" class="goodslistBox">
            <div class="goodsTop flex-between">
              <div>全部商品</div>
              <div @click="showIcon()">
                <i class="el-icon-close" style=" cursor: pointer;" />
              </div>
            </div>
            <div class="goodList">
              <div v-for="gitems in goodList" :key="gitems+21" class="flex-left goods">
                <!-- <el-image class="good_avatar" :src="gitems.commodityPic" :fit="contain" /> -->
                <img class="good_avatar" :src="showImg(gitems.commodityPic)">
                <div class="c-flex-top goodsMsg flex-1">
                  <p>{{ gitems.commodityName }}</p>
                  <p>{{ gitems.specName }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="shareFlag" class="flex-between shareBox">
            <div class="share_colose" @click="closeShare">
              <i class="el-icon-close" />
            </div>
            <div
              v-for="(sitem,index) in shareList"
              :key="sitem.avatar+1"
              v-clipboard:copy="shareUrl"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              class="c-flex-center"
              :style="{'margin-right':index==shareList.length-1 ? '':'20px','cursor':'pointer'}"
              @click="shares(index)"
            >
              <!-- <el-image class="share_avatar" :src="sitem.avatar" :fit="contain" /> -->
              <img class="share_avatar" :src="sitem.avatar">
              <span class="ellipsis_one" style="margin-top:20px">{{ sitem.name }}</span>
            </div>
          </div>

          <el-dialog
            title="链接地址"
            :visible.sync="dialogVisible"
            width="25%"
            top="350px"
            :close-on-click-modal="false"
            append-to-body
            custom-class="sagoZindex"
            :before-close="handleClose"
          >
            <div>
              <div class="flex-left" style="margin-bottom:20px">
                <strong class="bold" style="margin-right:10px">服务地址:</strong>
                <el-input v-model="LiveDetails.serviceUrl" class="flex-1" placeholder="请输入内容">
                  <template slot="append" icon="el-icon-search">
                    <el-button
                      slot="append"
                      v-clipboard:copy="LiveDetails.serviceUrl"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      icon="el-icon-document-copy"
                    />
                  </template>
                </el-input>
              </div>
              <div class="flex-left">
                <strong class="bold" style="margin-right:10px">串流密钥:</strong>
                <el-input
                  v-model="LiveDetails.crossfireSecretKey"
                  class="flex-1"
                  placeholder="请输入内容"
                >
                  <template slot="append" icon="el-icon-search">
                    <el-button
                      slot="append"
                      v-clipboard:copy="LiveDetails.crossfireSecretKey"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      icon="el-icon-document-copy"
                    />
                  </template>
                </el-input>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title
            :visible.sync="courseAgreement"
            width="45%"
            center
            :close-on-click-modal="false"
            append-to-body
            :before-close="handleClose"
          >
            <div class="courseAgreementBox">
              <p class="text-center bold" style="font-size:18px">《海典软件主播协议》</p>
              <br>
              <p>
                《海典直播协议》，是上海海典软件股份有限公司（以下简称“我方”）和你方（你方为自然人、法人或其他组织）所约定的规范双方权利和义务的具有法律效力的电子协议，下称“本协议”。你方勾选“我同意”或点击“我已阅读并遵守该协议”按钮，即表示你方已经仔细阅读、充分理解并完全地毫无保留地接受本协议的所有条款。
                <br>
                <br>
              </p>
              <p class="bold">第一条 总则</p>
              <p>
                1、海典平台是指由上海海典软件股份有限公司及其关联公司包括但不限于上海海典软件股份有限公司自有在线解说平台。你方根据我方注册要求及规则，在我方合法经营的海典平台（以下简称“平台”）上申请成为我方的直播服务提供方（或称“直播方”），为我方平台用户提供在线解说（本协议项下“解说”均亦指“直播”）视频内容的直播服务，你方在我方平台提供服务期间均应视为协议期内。我方不事先审核前述被上载的、由你方参与、编辑、制作的视频内容，也不主动对该等视频进行任何编辑、整理、修改、加工。
                <br>2、签署本协议前，你方已充分了解我方之各项规则及要求，且有条件及有能力、资格履行本协议约定的直播方职责及义务。本协议对你方构成有效的、带有约束力的、可强制执行的法定义务，你方对本协议下所有条款及定义等内容均已明确知悉，并无疑义。
                <br>3、你方承诺并声明在为我方提供服务时符合所在地法律的相关规定，不得以履行本协议名义从事其他违反中国及所在地法律规定的行为。
                <br>4、你方与我方不构成任何劳动法律层面的雇佣、劳动、劳务关系，我方无需向你方支付社会保险金和福利。
                <br>5、未经我方事先书面同意，你方不得在第三方竞争平台上从事任何与解说相关的行为（包括但不限于：视频直播互动、同步推流、发布解说视频或其余类似行为）。前述第三方竞争平台指：与我方及我方关联公司有竞争关系的第三方直播平台，包括但不限于虎牙直播、战旗TV、熊猫TV、火猫直播、风云直播、播狗、新浪游戏、QT、17173、PPTV、TGA、AZUBU、TWITCH等及其相关联的直播网站。
                <br>6、 你方在注册成为海典主播或在海典平台进行直播服务前已确认，未与任何第三方平台签署或存在有效存续的独家直播解说协议。
                <br>7、 在双方合作期间，你方直播、上传、发布或传输等内容的相关权利，适用于《用户注册协议》“4.2服务规范”中条款的约定。
                <br>
              </p>
              <br>
              <p class="bold">第二条 我方权利义务</p>1、我方有权制定平台运营制度及对直播方的管理规则，并将其作为本协议的一部分，有权对你方进行管理和监督，有权根据运营情况对相应规则做出调整或变更，你方对此表示理解和同意。
              <br>2、我方有权对你方进行考察、评判，以确立（取消）对你方的奖励或处罚，具体考察项目及标准由我方另行制定，无需额外征得你方同意。如我方要求与你方另行签订正式的解说合作协议的，你方不得拒绝或以其他形式变相拒绝签订【否则你方应一次性向我方支付违约金【50000】（大写：伍万）元】。
              <br>3、我方有权对你方的直播服务提出改进建议和意见，你方应在收到我方的建议和意见后【3】个工作日内进行相应的整改，否则我方有权限制、关闭、回收、或终止你方对海典直播间的使用，相应扣减应支付给你方的服务费用（若有）可能会给你方造成一定的损失，该损失由你方自行承担，我方不承担任何责任。
              <br>4、我方对你方进行的解说直播相关事宜拥有最终决定权。
              <br>5、我方有权使用你方的的名称（包括但不限于你方真实姓名、笔名、网名、曾用名及任何代表你方身份的文字符号）、肖像（包括但不限于真人肖像及卡通肖像等）进行我方平台的各类宣传。
              <br>6、我方负责提供平台技术服务支持，同时负责平台服务费用结算（若有）。
              <br>
              <br>
              <p class="bold">第三条 你方权利义务</p>1、你方应当使用真实身份信息及个人资料，不得以虚假、冒用的居民身份信息、企业注册信息、组织机构代码信息进行注册并认证。若你方的个人资料有任何变动，应及时更新。我方禁止未成年人直播，若法定监护人希望未成年人得以提供本协议约定的网络直播及解说服务的，必须以法定监护人身份加以判断该等服务内容是否适合于未成年人，并由法定监护人承担因此而导致的一切后果。你方承诺不会因执行本协议损害任何第三方合法利益，你方接受并履行本协议不违反任何对你有约束力的法律文件，亦不会使我方对任何第三方承担责任。
              <br>2、你方自己承担进行解说直播所需要的网络、支持视频和语音的设备，并保证直播图像清、语音质量清晰、稳定。
              <br>3、你方承诺，愿意遵照平台设定的直播间申请程序，提交平台所需的申请材料并自愿缴付相应的保证金。
              <br>4、你方承诺直播房间必须作解说直播用途，不得用于其他任何非解说直播性质的活动。
              <br>5、你方开展本协议项下解说直播事项和/或在本平台上发布的所有信息/资讯/言论/内容等均不得含有任何违反中华人民共和国有关法律、法规及规定的内容，包括但不限于危害国家安全、淫秽色情、虚假、违法、诽谤（包括商业诽谤）、非法恐吓或非法骚扰、侵犯他人知识产权、人身权、商业秘密或其他合法权益以及有违公序良俗的内容或指向这些内容的链接。
              <br>6、你方承诺积极维护我方及我方平台形象，你方不会做出有损于我方及/或我方平台形象或利益的行为，本协议期内及协议终止后，你方不会通过任何渠道（包括但不限于网站、博客、微博、微信、QQ聊天群、玩家聚会等）暗示或发布不利于我方及/或我方平台的言论。
              <br>8、您特此陈述并保证：(1）您当前并未在受美国制裁国家或地区（包括但不限于克里米亚、古巴、伊朗、北朝鲜、及叙利亚）居住或停留；(2）您并不属于美国政府禁止或限制主体名单（包括美国财政部海外资产办公室管理的《特别指定国民名单》Specially Designated Nationals and Blocked Persons List）的主体或人员；(3）您并不属于其他任何遭受美国或联合国经济制裁名单主体或人员，该等名单包括但不限于a）《行业制裁识别名单》Sectoral Sanctions Identifications List；b)《海外逃避制裁者名单》 Foreign Sanctions Evaders List；c)《巴勒斯坦立法会名单》NON-SDN Palestinian Legislative Council List；d)《非SDN涉伊朗制裁法案名单》Non-SDN Iran Sanctions Act List等。
              <br>
              <br>
              <p class="bold">第四条 服务费用及结算</p>1、以你方为平台用户提供解说直播服务为前提，用户可对你方进行赠送虚拟礼物的消费，你方可根据我方的结算要求及规则申请结算相应的服务费用（若有）。我方就你方收到的每笔虚拟礼物以数量为计价单位，且以一定的比例为价值基准进行兑换结算，作为支付给你方的服务费用。对于非正常手段获得的虚拟礼物消费，我方有权进行独立判断和处理。
              <br>2、你方所获得的服务费用应当依据国家相关法律法规缴纳税金，我方将你方所获得的服务费用支付于你方在用户中心中填写的银行账户中，你方可在登陆我方平台后在个人中心-主播相关-收益记录中查询相关信息（结算数据为含税数据）。
              <br>3、若你方为自然人，并在我方平台注册并通过个人认证的，则我方有权将你方所获得的服务费用支付于你方在用户中心填写的个人银行账户中；若你方为法人或其他组织，并在我方平台注册且通过机构认证的，则我方有权将你方所获得服务费用支付于你方在机构认证页面填写的机构账户中，但你方应当在我方付款前5个工作日内向我方提供等额有效的增值税专用发票（发票名目为直播服务费），因你方延迟提供发票导致我方付款延迟的，不构成我方违约。我方按照你方填写的账户支付服务费用，即视为我方已经履行了本协议约定的付款义务。若你方为法人或其他组织的，你方工作人员或旗下主播因管理及运营该帐号及其直播房间产生的费用，由你方与你方工作人员或旗下主播之间自行结算。若你方因该费用结算而引起纠纷、诉讼或赔偿给我方造成损失的（包括但不限于你方拖欠你方工作人员或旗下主播薪资费用时我方先行垫付其薪资的款项），我方有权在应付服务费用中先行扣除，不足部分我方有权向你方追偿。
              <br>4、你方保证填写账户信息正确、真实、有效，如因账户信息造成我方的任何支付错误，由你方独自承担责任。同时，若你方需要变更帐户信息，需及时书面通知我方，新账户信息由你方提交申请且经我方审核通过后下一个结算月生效。
              <br>
              <br>
              <p class="bold">第五条 保密制度</p>1、你方应严格遵守我方的保密制度，承诺无限期保守我方的商业秘密。因你方违反约定使用或披露我方商业秘密和信息使我方遭受任何名誉、声誉或经济上的、直接或间接的损失，你方应赔偿我方人民币[ 100000 ]元违约金，不足以弥补我方损失的，你方还应赔偿我方损失。
              <br>2、商业秘密是指由我方提供的、或者你方在双方合作期间了解到的、或者我方对第三方承担保密义务的，与我方业务有关的，能为我方带来经济利益，具有实用性的、非公知的所有信息，包括（但不限于）：技术信息、经营信息和与我方行政管理有关的信息和文件（含本协议及相关协议内容）、你方从我方获得的服务费用的金额和结算方式、标准、权利归属方式、授权方式、客户名单、其他解说员的名单、联系方式、服务费用、我方工作人员名单等不为公众所知悉的信息。
              <br>3、你方应严格遵守本协议，未经我方书面授权或同意，对我方的商业秘密不得：
              （1）以任何方式向第三方或不特定的公众进行传播、泄露；
              （2）为非本协议的目的而使用我方的商业秘密。
              <br>4、本协议终止后，你方应将我方商业秘密悉数返还我方，或在我方监督下，将记载我方商业秘密的全部文件销毁。
              <br>5、本条规定在本协议终止后仍然有效。
              <br>
              <br>
              <p class="bold">第六条 协议的变更、解除、终止</p>1、我方有权在必要时变更、中止、终止本协议，并在相关页面进行通知，变更后的协议一旦在相关的页面上公布即有效代替原来的协议。本协议条款变更后，如你方继续为我方平台用户提供解说等直播服务，即视为你方已知悉并接受变更后的协议。如你方不同意我方对本协议的所作的任何变更，你方应立即书面通知我方并停止在我方平台进行的任何直播服务。
              <br>2、双方就解除本协议协商一致即可终止协议。
              <br>3、你方有下列情形之一，我方可以立即解除本协议，不需要提前通知：
              （1）我方发现你方违反对本协议所做的声明与承诺的；
              （2）因你方行为直接或间接给对我方利益造成重大损害的；
              （3）违反国家法律法规的；
              （4）违反本协议规定的其它义务；
              （5）以消极、不作为等不符合我方要求的方式履行本协议的（即使未构成违约），经我方通知后10日内仍未改正的；
              （6）因异常情形的出现，我方认为你方不适合进行本协议下服务事项，经我方通知后10日内异常情形仍未消除的；
              （7）因我方业务调整，不再进行直播服务业务的。
              <br>4、由于本协议第六条第1、2款造成的协议解除、终止，我方按本协议第四条规定及我方平台实时政策约定与你方结算服务费用。
              <br>5、由于本协议第六条第3款造成的协议解除、终止，我方有权扣除你方帐号中尚未结算的全部服务费用，并有权要求你方按约定承担违约责任。
              <br>6、本协议终止后，不影响本协议约定的直播方成果的权利归属，我方仍为本协议所涉直播方成果的权利人；如果根据中国法律，上述之约定无法实际履行的，你方同意并承诺自本协议终止或双方后续合作中止、终止或解除之日起五年内不将直播方成果的全部或部分的发布、使用等相关的权利（包括但不限于《中华人民共和国著作权法》第十条第一款第（五）项至第（十七）项规定的著作权权利）自行行使、转让或授权许可于任何第三方。
              <br>
              <br>
              <p class="bold">第七条 违约责任</p>1、任何由于你方声明不实或违反其声明承诺事项导致他方向我方提起诉讼、索赔及/或导致我方声誉受损之后果，你方将承担我方因此产生的全部直接及间接费用、损失及赔偿，其中包括我方为诉讼支付的有关费用及律师费。
              <br>2、除本协议另有约定外，你方违反本协议下任何规定或你方提供的服务不符合我方的要求，我方有权单方面采取相应限制或处罚措施，包括但不限于：限制、关闭、回收、或终止你方对海典直播间的使用，限制或停止某项单独服务（如视频直播）并根据实际情况决定是否恢复使用，扣除你方帐号中尚未结算的服务费用。
              <br>
              <br>
              <p class="bold">第八条 争议处理</p>
              <p>因履行本协议而产生的任何争议，双方均应本着友好协商的原则加以解决。协商解决未果，任何一方均可以提请上海市东湖新技术开发区人民法院诉讼解决。</p>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                style="width:120px;font-size:15px"
                @click="courseAgreement = false"
              >确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="直播教程"
            :visible.sync="courseFlag"
            width="50%"
            append-to-body
            :before-close="handleClose"
          >
            <p>
              如果你是台式电脑，需要准备摄像头和音响（或者一个耳机）
              1、返回列表后，列表操作栏，点击开播发起直播（只能在开播时间前30分钟之内发起），点击开播，进入直播页面。
            </p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc1.png"
              :preview-src-list="srcList"
            />
            <p>2、进入直播页面，左边是评论展示区。中间有三个按钮，分别是直播教程、下载软件、获取链接。首先点击直播教程，看一下教程如何操作。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc2.png"
              :preview-src-list="srcList"
            />
            <p>3、点击下载软件，跳转到软件下载页面（https://obsproject.com/download?spm=a2c4g.11186623.2.15.6aac1445JPlKR8），跳转到下载页面后，选择相应的操作系统（windows、苹果、Linx），下载该软件。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc3.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc4.png"
              :preview-src-list="srcList"
            />
            <p>4、软件下载好以后，在电脑中找到该软件下载保存的位置，安装该软件。点击该软件安装包（EXE格式），在弹出的面板中，一直选择next，然后选择install安装。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc5.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc6.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc7.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc8.png"
              :preview-src-list="srcList"
            />
            <p>5、安装好软件之后，在桌面打开软件，进入软件界面，软件初始化弹出的弹窗都可以不管它。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc9.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc10.png"
              :preview-src-list="srcList"
            />
            <p>6、打开软件后，点击来源下+号按钮，添加音频输入捕获、视频捕获设备。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc11.png"
              :preview-src-list="srcList"
            />
            <p>7、然后点击右下角设置按钮，进入设置中心，进入设置中心后，点击推流设置，将服务选择为自定义。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc12.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc13.png"
              :preview-src-list="srcList"
            />
            <p>8、然后回到直播页面，复制服务地址，将服务地址复制到软件设置中心-推流设置服务器一栏中，将串流密钥复制到软件设置中心-推流设置串流密钥中，然后点击确定。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc14.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc15.png"
              :preview-src-list="srcList"
            />
            <p>9、然后回到软件主界面，点击右下角开始推流按钮，点击之后就开始推流了。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc16.png"
              :preview-src-list="srcList"
            />
            <p>10、点击主界面，视频区，会出现红色线框，然后右击鼠标，选择调整输出大小（到源大小），选择后，弹出是否确定按钮，点击确定，视频区就会变大。</p>
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc17.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc18.png"
              :preview-src-list="srcList"
            />
            <el-image
              class="courseImg"
              src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc19.png"
              :preview-src-list="srcList"
            />
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="courseFlag = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { mapGetters } from 'vuex'
import liveRequest from '@/api/live'
import config from '@/utils/config'
import TIM from 'tim-js-sdk'
import COS from 'cos-js-sdk-v5'
Vue.use(VueClipboard)
// import storeGoods from '@/views/marketing/components/store-gods'
// import checkCoupon from '@/components/Marketings/checkCoupon'
export default {
  name: 'LiveActivityEdit',
  //   components:[ { storeGoods, checkCoupon }],
  data() {
    return {
      discuss_planHeight: 350,
      LiveDetails: {},
      goodList: [],
      chatList: [],
      courseFlag: false,
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      liveNumber: '',
      srcList: [
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc1.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc2.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc3.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc4.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc5.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc6.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc7.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc8.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc9.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc10.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc11.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc12.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc13.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc14.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc15.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc16.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc17.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc18.png',
        'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_jc19.png'
      ],
      shareList: [
        {
          name: '微博',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_wb.png'
        },
        {
          name: 'QQ空间',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_QQko.png'
        },
        {
          name: 'QQ好友',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_QQ.png'
        },
        {
          name: '复制链接',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_conyll.png'
        }
      ],
      goodsListflag: false,
      iconFlag: true,
      shareFlag: false,
      dialogVisible: false,
      courseAgreement: false
    }
  },
  async created() {
    // 1获取IM密钥 2获取直播详情 拿到必要参数后 获取直播分享链接 和商品列表 还有打开tim流程
    await this.getTimgensing()
    await this.getLiveDetails()
    this.getLivegoods()
    this.getShareLivePage()
    this.timOpen()
    const commentBoxHeight = this.$refs.commentBox.offsetHeight
    const commentBox_topHeight = this.$refs.commentBox_top.offsetHeight
    this.discuss_plan = commentBoxHeight - commentBox_topHeight
  },
  // beforeRouteLeave(to, from, next) {
  //   const answer = window.confirm('请问您是否确认下播?')
  //   if (answer) {
  //     console.log('11')
  //     next()
  //   } else {
  //     next(false)
  //   }
  // },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  methods: {
    // 获取IM 密钥
    async getTimgensing() {
      try {
        const { data } = await liveRequest.getTimgensing({ name: this.name })
        console.log(data)
        this.gensing = data
      } catch (error) {
        console.log(error)
      }
    },
    // 打开IM 流程方法
    async timOpen() {
      console.log(this.name)
      const options = {
        SDKAppID: 1400365628 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
      }
      // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
      const tim = TIM.create(options) // SDK 实例通常用 tim 表示
      console.log(tim)
      // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
      tim.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
      // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
      // 注册 COS SDK 插件
      tim.registerPlugin({ 'cos-js-sdk': COS })
      tim.on(TIM.EVENT.SDK_READY, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        // event.name - TIM.EVENT.SDK_READY
        console.log('event--------------', event)
      })
      // 登录
      const promise = await tim.login({
        userID: this.name,
        userSig: this.gensing
      })
      console.log('promise-------------', promise)
      // 接受消息
      const onMessageReceived = event => {
        // event.data - 存储 Message 对象的数组 - [Message]
        if (event.data[0].payload.text) {
          const { nick, payload, avatar } = event.data[0]
          this.chatList.push({ nick: nick, payload: payload, avatar: avatar })
          // 此时必须异步执行滚动条滑动至底部
          const box = this.$refs.box
          setTimeout(() => {
            box.scrollTop = box.scrollHeight
          }, 0)
        }
      }
      tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
      // 加入群聊天室
      const joinOptions = {
        groupID: this.LiveDetails.groupId,
        type: 'TIM.TYPES.GRP_PUBLIC'
      }
      const promise1 = await tim.joinGroup(joinOptions)
      if (promise1.data.status) {
        // 加入的群组资料、
        switch (promise1.data.status) {
          case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL:
            console.log('等待管理员同意')
            break // 等待管理员同意
          case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            console.log('成功')
            break
          default:
            break
        }
      }

      // 获取群成员人数
      const promise2 = await tim.getGroupProfile({
        groupID: this.LiveDetails.groupId
      })
      this.liveNumber = promise2.data.group.memberNum
      setInterval(async() => {
        const promise2 = await tim.getGroupProfile({
          groupID: this.LiveDetails.groupId
        })
        this.liveNumber = promise2.data.group.memberNum
      }, 3000)
    },
    // 获取直播详情
    async getLiveDetails() {
      try {
        const { data } = await liveRequest.getLiveDetails({
          liveId: this.$route.query.id
        })
        this.LiveDetails = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取直播商品列表
    async getLivegoods() {
      try {
        const { data } = await liveRequest.getLivegoods({
          liveId: this.$route.query.id
        })
        console.log(data)
        this.goodList = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取C端直播链接
    async getShareLivePage() {
      try {
        const { data } = await liveRequest.getShareLivePage(
          `${this.merCode}`,
          `${this.$route.query.id}`
        )
        this.shareUrl = data
      } catch (error) {
        console.log(error)
      }
    },
    // 显示直播商品列表
    showGood() {
      this.goodsListflag = true
      this.iconFlag = false
    },
    // 显示分享 商品  等图标
    showIcon() {
      this.goodsListflag = false
      this.iconFlag = true
    },
    // 关闭分享列表
    closeShare() {
      this.shareFlag = false
      this.iconFlag = true
    },
    // 打开分享
    openShare() {
      this.shareFlag = true
      this.iconFlag = false
    },
    // 打开复制链接盒子
    handleClose(done) {
      done()
    },
    // 复制成功
    onCopy: function() {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    // 复制失败
    onError: function() {
      this.$message({
        message: '复制失败,请手动复制',
        type: 'success'
      })
    },
    // 打开教程
    openCourse() {
      this.courseFlag = true
    },
    // 关闭直播
    async closeLive() {
      try {
        this.$confirm('是否确认下播?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            const { data } = await liveRequest.closeLive({
              liveId: this.$route.query.id
            })
            console.log(data)
            if (!data) {
              return
            }
            this.$router.push(`/live-manage/activity`)
          })
          .catch(() => {})
      } catch (error) {
        console.log(error)
      }
    },
    // 分享到各个平台
    shares(index) {
      let _shareUrl = ''
      switch (index) {
        case 0:
          // 真实的appkey，必选参数
          _shareUrl += 'http://v.t.sina.com.cn/share/share.php?title='
          '&url=' + encodeURIComponent(this.shareUrl || document.location) // 参数url设置分享的内容链接|默认当前页location，可选参数
          _shareUrl +=
            '&title=' +
            encodeURIComponent(
              this.LiveDetails.name +
                this.LiveDetails.merName +
                '正在直播中,速来围观' +
                this.shareUrl || document.title
            ) // 参数title设置分享的标题|默认当前页标题，可选参数
          _shareUrl += '&content=' + 'utf-8' // 参数content设置页面编码gb2312|utf-8，可选参数
          _shareUrl +=
            '&pic=' + encodeURIComponent(this.LiveDetails.coverPicUrl || '') // 参数pic设置图片链接|默认为空，可选参数
          window.open(_shareUrl, '_blank')
          break
        case 1:
          _shareUrl =
            'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
          _shareUrl +=
            'url=' + encodeURIComponent(this.shareUrl || document.location) // 参数url设置分享的内容链接|默认当前页location
          _shareUrl += '&showcount=' + '' || 0 // 参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
          _shareUrl +=
            '&desc=' +
            encodeURIComponent(
              '' ||
                this.LiveDetails.name +
                  this.LiveDetails.merName +
                  '正在直播中,速来围观'
            ) // 参数desc设置分享的描述，可选参数
          _shareUrl += '&summary=' + encodeURIComponent('') // 参数summary设置分享摘要，可选参数
          _shareUrl +=
            '&title=' +
            encodeURIComponent(
              this.LiveDetails.name +
                this.LiveDetails.merName +
                '正在直播中,速来围观' || document.title
            ) // 参数title设置分享标题，可选参数
          _shareUrl +=
            '&pics=' + encodeURIComponent(this.LiveDetails.coverPicUrl || '') // 参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
          window.open(_shareUrl, '_blank')
          break
        case 2:
          _shareUrl = 'https://connect.qq.com/widget/shareqq/index.html?'
          _shareUrl +=
            'url=' + encodeURIComponent(this.shareUrl || location.href) // 分享的链接
          _shareUrl +=
            '&title=' +
            encodeURIComponent(
              this.LiveDetails.name +
                this.LiveDetails.merName +
                '正在直播中,速来围观' || document.title
            ) // 分享的标题
          _shareUrl +=
            '&pics=' +
            encodeURIComponent(
              this.LiveDetails.name +
                this.LiveDetails.merName +
                '正在直播中,速来围观' || document.title
            ) // 分享的标题
          window.open(_shareUrl, '_blank')
          break
        case 3:
          console.log('复制')
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.courseAgreementBox {
  line-height: 1.8;
  padding: 20px;
}
.app-container {
  padding: 20px;
  height: calc(100vh - 158px);
  overflow-y: scroll;
}
/* 文字换行 */
.ellipsis_one {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.3;
}
.ellipsis_two {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.3;
}
.bold {
  font-weight: 700;
}
.text-center {
  text-align: center;
}
.flex-left {
  display: flex;
  justify-content: left;
  align-items: center;
}
.flex-left-top {
  display: flex;
  justify-content: left;
  align-items: flex-start;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.c-flex-top {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: space-between;
}
.c-flex-center {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.flex-1 {
  flex: 1;
}
.flex-wrap {
  flex-wrap: wrap;
}
.cloneButtom {
  font-size: 12px;
  padding: 6px;
  border-radius: 5px;
  color: #fff;
  background: rgba(73, 127, 254, 1);
  cursor: pointer;
}
.courseImg {
  padding: 20px 0;
}
.live-now-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .shopTop {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 76, 255, 1) 0%,
      rgba(73, 127, 254, 1) 100%
    );
    .shopTop_avatar {
      margin-left: 20px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 30px;
    }
    .shopTitle {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
    }
  }
  .containerCenter {
    // background: #f5f5f5;
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 40px);
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    .commentBox {
      width: 25%;
      height: 100%;
      padding: 20px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      overflow: hidden;
    }
    .coverbox {
      width: 100%;
      padding-bottom: 10px;
    }
    .comment_avatar {
      width: 200px;
      height: 100px;
    }
    .comment_Title {
      font-size: 16px;
      font-weight: 700;
      padding-bottom: 10px;
      border-bottom: 1px solid #fff;
      overflow: hidden;
    }
    .now-people {
      font-size: 14px;
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tips {
      font-size: 14px;
      margin-top: 10px;
      font-weight: 400;
      line-height: 25px;
    }
    .discuss-plan {
      width: 100%;
      margin-top: 20px;
      height: 350px;
      overflow-y: scroll;
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .discuss-box {
      width: 100%;
      margin-bottom: 30px;
      overflow: hidden;
    }
    .userMsg {
      width: 30%;
    }
    .discussConten {
      margin-left: 10px;
      word-break: break-all;
      cursor: pointer;
    }
    .discuss_avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .courseBox {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
    .courseButtom {
      display: block;
      width: 200px;
      background: #497ffe;
      color: #fff;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
    }
    .courseCenter {
      width: 100%;
    }
    .courseTip {
      text-align: center;
      font-weight: 600;
      color: #fff;
    }
    .courseAgreement {
      color: rgb(128, 159, 233);
      font-weight: 600;
      cursor: pointer;
    }

    .live-state {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 180px;
      color: #fff;
    }
    .goodsBox {
      width: 25%;
      height: 100%;

      position: relative;
      color: #fff;
    }
    .iconsBox {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
    .shareIcon {
      background: #f5f5f5;
      color: #000;
      font-size: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .goodsTop {
      height: 60px;
      width: 100%;
      padding: 0 20px;
      border-bottom: 1px solid #000;
    }
    .goodList {
      height: 600px;
      width: 100%;
      overflow: hidden;
      overflow-y: scroll;
    }
    .goodslistBox {
      background: rgba(0, 0, 0, 0.5);
    }
    .goods {
      padding: 20px;
      height: 100px;
    }
    .good_avatar {
      height: 70px;
      width: 120px;
    }
    .goodsMsg {
      margin-left: 30px;
      height: 100%;
    }
    .shareBox {
      padding: 20px;
      width: 100%;
      height: 200px;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .share_avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .share_colose {
      position: absolute;
      top: 15px;
      right: 0px;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
    .closeLiveIcon {
      position: absolute;
      top: 5px;
      right: 30px;
    }
  }
}
</style>
