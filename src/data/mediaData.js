import case_bridal_gallery1 from '@/assets/images/collections/case_bridal_gallery1.jpg';
import case_bridal_gallery2 from '@/assets/images/collections/case_bridal_gallery2.jpg';
import case_bridal_full from '@/assets/images/collections/case_bridal_full.jpg';
import case_dramatic_gallery1 from '@/assets/images/collections/case_dramatic_gallery1.jpg';
import case_dramatic_full from '@/assets/images/collections/case_dramatic_full.jpg';
import case_dramatic_gallery3 from '@/assets/images/collections/case_dramatic_gallery3.jpg';
import case_dramatic_gallery4 from '@/assets/images/collections/case_dramatic_gallery4.jpg';
import case_summer_gallery1 from '@/assets/images/collections/case_summer_gallery1.jpg';
import case_summer_full from '@/assets/images/collections/case_summer_full.jpg';
import case_summer_gallery3 from '@/assets/images/collections/case_summer_gallery3.jpg';
import case_editorial_full from '@/assets/images/collections/case_editorial_full.jpg';
import case_editorial_gallery2 from '@/assets/images/collections/case_editorial_gallery2.jpg';
// 哈密图片资源
import hami1 from '@/assets/images/hami/1.png';
import hami2 from '@/assets/images/hami/2.png';
import hami3 from '@/assets/images/hami/3.png';
import hami4 from '@/assets/images/hami/4.jpg';
import hami5 from '@/assets/images/hami/5.jpg';
// 喀什图片资源
import kashi1 from '@/assets/images/kashi/1.jpg';
import kashi2 from '@/assets/images/kashi/2.jpg';
import kashi3 from '@/assets/images/kashi/3.jpg';
import kashi4 from '@/assets/images/kashi/4.jpg';
import kashi5 from '@/assets/images/kashi/5.jpg';
import kashi6 from '@/assets/images/kashi/6.jpg';
// 阿克苏图片资源
import akesu1 from '@/assets/images/akesu/1.jpg';
import akesu2 from '@/assets/images/akesu/2.jpg';
import akesu3 from '@/assets/images/akesu/3.jpg';
import akesu4 from '@/assets/images/akesu/4.jpg';
import akesu5 from '@/assets/images/akesu/5.jpg';
// 吐鲁番图片资源
import tulufan1 from '@/assets/images/tulufan/1.jpg';
import tulufan2 from '@/assets/images/tulufan/2.jpg';
import tulufan3 from '@/assets/images/tulufan/3.jpg';
import tulufan4 from '@/assets/images/tulufan/4.jpg';
import tulufan5 from '@/assets/images/tulufan/5.jpg';

// hami, kashi, akesu, tulufan 的视频资源
import hamiVideo from '@/assets/videos/hami.mp4';
import kashiVideo from '@/assets/videos/kashi.mp4';
import akesuVideo from '@/assets/videos/akesu.mp4';
import tulufanVideo from '@/assets/videos/tulufan.mp4';
import huaxizi from '@/assets/videos/huaxizi.mp4';
import shanshi from '@/assets/videos/shanshi.mp4';

// VR 资源
import vr1 from '@/assets/videos/vr1.mp4';


export const beautyCases = [
  {
    id: 'case1',
    title: '永恒新娘 | 优雅纯净妆容',
    summary:
      '新娘的永恒经典妆容，突显自然美，确保在镜头前和现实中都完美无瑕。',
    image: case_bridal_full, // 可以是主视觉图
    galleryImages: [
      // 案例画廊图片
      case_bridal_gallery1,
      case_bridal_gallery2,
      case_bridal_full,
    ],
    highlights: [
      '无瑕透明的底妆',
      '温柔优雅的眼部轮廓',
      '自然清新的唇色',
      "持久妆容，准备迎接一整天的挑战",
    ],
    productsUsed: [
      { name: 'CPB光采柔滑粉底液', brand: '肌肤之钥', type: 'Foundation' },
      { name: 'SUQQU 设计彩妆眼影盘', brand: 'SUQQU', type: 'Eyeshadow' },
      { name: '海蓝之谜焕活精华油', brand: 'La Mer', type: 'Skincare' },
      {
        name: '纪梵希高级定制丝绒唇膏',
        brand: 'Givenchy',
        type: 'Lipstick',
      },
    ],
    fullDescription:
      '这种妆容是专为新娘设计的，旨在展现一种既经典又现代的纯粹美感。我们从深层护肤开始，使用高端产品为肌肤打造完美的基础。底妆采用轻薄却高度遮瑕的粉底，结合精准的局部遮瑕，营造出无瑕且自然的肤质。眼妆注重柔和的过渡和自然放大的效果，使用大地色系眼影搭配纤长卷翘的睫毛。唇妆选择裸粉色或浅珊瑚色，与肤色相得益彰，提升整体温柔气质。最后，通过专业的定妆技巧，确保妆容在婚礼当天的欢笑与泪水中依然完美无瑕。',
  },
  {
    id: 'case2',
    title: '迷人的夜晚 | 红毯烟熏妆',
    summary:
      '打造令人难忘的红毯造型，以深邃的烟熏眼妆和精致的面部轮廓为中心，散发极致魅力。',
    image: case_dramatic_full,
    galleryImages: [
      case_dramatic_gallery1,
      case_dramatic_full,
      case_dramatic_gallery3,
      case_dramatic_gallery4,
    ],
    highlights: [
      '深邃迷人的烟熏眼妆',
      '三维轮廓突显了骨骼结构的美感。',
      '饱满丰盈的唇形',
      '突出高光以增强光泽感',
    ],
    productsUsed: [
      {
        name: '帕特·麦格拉斯实验室 Mothership V 眼影盘',
        brand: '帕特·麦格拉斯实验室',
        type: 'Eyeshadow',
      },
      {
        name: '芬蒂美妆Match Stix哑光修容棒',
        brand: 'Fenty Beauty',
        type: 'Contour',
      },
      { name: '迪奥烈艳蓝金唇膏 #999', brand: 'Dior', type: 'Lipstick' },
      { name: '沙漏环境光调色板', brand: 'Hourglass', type: 'Face Palette' },
    ],
    fullDescription:
      '这款红毯烟熏妆的重点在于眼部的深邃与魅力，通过分层的眼影晕染和眼线勾勒，打造出引人注目的眼妆效果。为了平衡眼妆的浓烈感，面部修容以精准手法完成，突出颧骨和下颌线的立体感，同时用细腻的高光提亮特定部位，使肌肤在灯光下散发出精致的光泽。唇妆则选择浓郁的哑光或缎光色调，如经典正红或深莓色，与烟熏眼妆完美搭配。整个妆容的关键在于平衡与和谐，确保每个细节都散发出奢华与自信的气质。',
  },
  {
    id: 'case3',
    title: '夏日清晨光 | 清新自然妆容',
    summary:
      '如何在炎热的夏天保持妆容清新持久，同时展现自然健康的裸肌妆感。',
    image: case_summer_full,
    galleryImages: [
      case_summer_gallery1,
      case_summer_full,
      case_summer_gallery3,
    ],
    highlights: [
      '轻盈保湿的底妆',
      '自然无痕的腮红',
      '清新持久，不易晕染',
      '自然妆容的小技巧',
    ],
    productsUsed: [
      { name: 'NARS 润色唇膏', brand: 'NARS', type: 'Lip Balm' },
      { name: 'RMK轻薄液体粉底', brand: 'RMK', type: 'Foundation' },
      { name: '三色光芒腮红', brand: 'THREE', type: 'Blush' },
    ],
    fullDescription:
      '夏季通透自然妆容的秘诀在于“少即是多”。我们选择轻薄透气的底妆产品，如防晒妆前乳或有色保湿霜，以均匀肤色而不增加肌肤负担。眼妆方面，只需使用少量提亮或大地色系的眼影，搭配防水睫毛膏，打造自然放大的双眼效果。腮红和唇妆则选择滋润型、色调轻盈自然的产品，呈现由内而外的健康光泽感。关键在于持久控油和定妆，确保妆容在炎热潮湿的天气中保持清新。',
  },
  {
    id: 'case4',
    title: '未来主义 | 几何线条创意妆容',
    summary:
      '大胆探索美的无限可能，运用鲜艳的色彩和几何线条创造前卫的艺术造型。',
    image: case_editorial_full,
    galleryImages: [
      case_editorial_full,
      case_editorial_gallery2,
    ],
    highlights: [
      '大胆使用颜色',
      '精确的几何线条',
      '通过光影对比突出立体感。',
      '艺术表达',
    ],
    productsUsed: [
      { name: '玫珂菲纯色眼影', brand: 'MUFE', type: 'Eyeshadow' },
      { name: 'NYX专业化妆液体眼线笔', brand: 'NYX', type: 'Eyeliner' },
      { name: '魅可子弹头口红（限量版）', brand: 'MAC', type: 'Lipstick' },
    ],
    fullDescription:
      '未来主义几何线条创意妆容是美学艺术与几何美学的完美融合。这个概念的核心是通过大胆对比的色彩组合以及精确锐利的几何线条，在面部创造出独特的视觉冲击，从而打破传统。眼部区域可能会采用漂浮式眼线、大胆的色块拼接，甚至是对称或非对称的抽象图案。面部轮廓通过夸张的光影对比得以突出，强调骨骼的结构感。这不仅仅是妆容，而是一件行走的艺术品，适合敢于表达自我并追求创新的时尚爱好者。',
  },
];


export const beautyImages = {
  hami: [
    {
      id: 'hami_img1',
      image: hami1,
    },
    {
      id: 'hami_img2',
      image: hami2,
    },
    {
      id: 'hami_img3',
      image: hami3,
    },
    {
      id: 'hami_img4',
      image: hami4,
    },
    {
      id: 'hami_img5',
      image: hami5,
    },
  ],
  kashi: [
    {
      id: 'kashi_img1',
      image: kashi1,
    },
    {
      id: 'kashi_img2',
      image: kashi2,
    },
    {
      id: 'kashi_img3',
      image: kashi3,
    },
    {
      id: 'kashi_img4',
      image: kashi4,
    },
    {
      id: 'kashi_img5',
      image: kashi5,
    },
    {
      id: 'kashi_img6',
      image: kashi6,
    },
  ],
  akesu: [
    {
      id: 'akesu_img1',
      image: akesu1,
    },
    {
      id: 'akesu_img2',
      image: akesu2,
    },
    {
      id: 'akesu_img3',
      image: akesu3,
    },
    {
      id: 'akesu_img4',
      image: akesu4,
    },
    {
      id: 'akesu_img5',
      image: akesu5,
    },
  ],
  tulufan: [
    {
      id: 'tulufan_img1',
      image: tulufan1,
    },
    {
      id: 'tulufan_img2',
      image: tulufan2,
    },
    {
      id: 'tulufan_img3',
      image: tulufan3,
    },
    {
      id: 'tulufan_img4',
      image: tulufan4,
    },
    {
      id: 'tulufan_img5',
      image: tulufan5,
    },
  ],
};

export const beautyVideos = [
  {
    id: 'hami',
    title: '哈密',
    videoUrl: hamiVideo, // 使用导入的视频资源
  }, 
  {
    id: 'kashi',
    title: '喀什',
    videoUrl: kashiVideo, // 使用导入的视频资源
  },
  {
    id: 'akesu',
    title: '阿克苏',
    videoUrl: akesuVideo, // 使用导入的视频资源
  },
  {
    id: 'tulufan',
    title: '吐鲁番',
    videoUrl: tulufanVideo, // 使用导入的视频资源
  },
  {
    id: 'huaxizi',
    title: '花西子宣传视频',
    videoUrl: huaxizi, // 使用导入的视频资源
  },
  {
    id: 'shanshi',
    title: '山师大叔视频',
    videoUrl: shanshi, // 使用导入的视频资源
  },
];

export const beautyVR = [
  { id: 'vr1', title: '360° 美妆工作室漫游', vrUrl: vr1, description: '在全景360度体验中探索我们的虚拟美妆工作室。沉浸式漫游，感受Éclat的艺术氛围。' },
  { id: 'vr2', title: '沉浸式妆容应用演示', vrUrl: 'https://www.example.com/your-vr-experience-2', description: '步入虚拟演示，体验复杂妆容的沉浸式应用技巧，从不同角度观察细节。' },
  { id: 'vr3', title: '未来美妆趋势探索', vrUrl: 'https://www.google.com/vr/index.html', description: '通过VR技术，提前感受未来美妆的潮流与创新，拓宽你的美妆视野。' },
  { id: 'vr4', title: 'T台秀场VR体验', vrUrl: 'https://www.example.com/your-vr-experience-4', description: '置身虚拟T台秀场，近距离欣赏妆容造型，感受时尚前沿的脉动。' },
];
