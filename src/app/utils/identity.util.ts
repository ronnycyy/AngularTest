import { GB2260 } from './identity.data';

export const extractInfo = (idNo: string) => {
  const addrPart = idNo.substring(0, 6); 
	const birthPart = idNo.substring(6, 14);
	
	return {
		addrCode: addrPart,
		dateOfBirth: birthPart
	}
}

// 验证地址码是否合法
export const isValidAddr = (addr: string) => {
	return GB2260[addr] !== undefined;    //如果地址码在数据库中找不到，则是非法地址
}

// 从地址码中构造地址对象
export const getAddrByCode = (code: string) => {
	const province = GB2260[code.substring(0, 2) + '0000'];   //取出地址码前两位，从数据库中定位到某个省
	const city = GB2260[code.substring(0, 4) + '00'].replace(province, '');    //将字符串中的省份去除
	const district = GB2260[code].replace(province + city, '');   

	return {
		province: province,
		city: city,
		district: district
	};
}