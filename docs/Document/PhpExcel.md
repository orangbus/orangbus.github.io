# PHPExcel

## 安装

```bash
composer require phpoffice/phpexcel
```



```
include 'PHPExcel.php';
include 'PHPExcel/Writer/Excel2007.php';
//或者include 'PHPExcel/Writer/Excel5.php'; 用于输出.xls的
```

## 创建一个excel

```
$objPHPExcel = new PHPExcel();
```

## 保存excel—2007格式

```
$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
//或者$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel); 非2007格式
$objWriter->save("xxx.xlsx");
```

## 给单元格内容设置url超链接

```
$objActSheet->getCell('E26')->getHyperlink()->setUrl( 'http://www.phpexcel.net');    //超链接url地址
$objActSheet->getCell('E26')->getHyperlink()->setTooltip( 'Navigate to website');  //鼠标移上去连接提示信息
```

## 直接输出到浏览器

```
$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
header("Pragma: public");
header("Expires: 0″);
header("Cache-Control:must-revalidate, post-check=0, pre-check=0″);
header("Content-Type:application/force-download");
header("Content-Type:application/vnd.ms-execl");
header("Content-Type:application/octet-stream");
header("Content-Type:application/download");;
header('Content-Disposition:attachment;filename="resume.xls"');
header("Content-Transfer-Encoding:binary");
$objWriter->save('php://output');
```

## 设置excel的属性：

```
创建人
$objPHPExcel->getProperties()->setCreator("Maarten Balliauw");
最后修改人
$objPHPExcel->getProperties()->setLastModifiedBy("Maarten Balliauw");
标题
$objPHPExcel->getProperties()->setTitle("Office 2007 XLSX Test Document");
题目
$objPHPExcel->getProperties()->setSubject("Office 2007 XLSX Test Document");
描述
$objPHPExcel->getProperties()->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.");
关键字
$objPHPExcel->getProperties()->setKeywords("office 2007 openxml php");
种类
$objPHPExcel->getProperties()->setCategory("Test result file");
```

## 设置当前的sheet

```
$objPHPExcel->setActiveSheetIndex(0);
设置sheet的name
$objPHPExcel->getActiveSheet()->setTitle('Simple');
设置单元格的值
$objPHPExcel->getActiveSheet()->setCellValue('A1', 'String');
$objPHPExcel->getActiveSheet()->setCellValue('A2', 12);
$objPHPExcel->getActiveSheet()->setCellValue('A3', true);
$objPHPExcel->getActiveSheet()->setCellValue('C5', '=SUM(C2:C4)');
$objPHPExcel->getActiveSheet()->setCellValue('B8', '=MIN(B2:C5)');
```

## 合并单元格

```
$objPHPExcel->getActiveSheet()->mergeCells('A18:E22');
```

## 分离单元格

```
$objPHPExcel->getActiveSheet()->unmergeCells('A28:B28');
```

## 保护cell

```
$objPHPExcel->getActiveSheet()->getProtection()->setSheet(true); // Needs to be set to true in order to enable any worksheet protection!
$objPHPExcel->getActiveSheet()->protectCells('A3:E13', 'PHPExcel');
```

## 设置格式

// Set cell number formats

```
echo date('H:i:s') . " Set cell number formats\n";
$objPHPExcel->getActiveSheet()->getStyle('E4')->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE);
$objPHPExcel->getActiveSheet()->duplicateStyle( $objPHPExcel->getActiveSheet()->getStyle('E4'), 'E5:E13' );
```

## 设置宽width

```
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(12);
```

## 设置font

```
$objPHPExcel->getActiveSheet()->getStyle('B1')->getFont()->setName('Candara');
$objPHPExcel->getActiveSheet()->getStyle('B1')->getFont()->setSize(20);
$objPHPExcel->getActiveSheet()->getStyle('B1')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->getStyle('B1')->getFont()->setUnderline(PHPExcel_Style_Font::UNDERLINE_SINGLE);
$objPHPExcel->getActiveSheet()->getStyle('B1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_WHITE);
$objPHPExcel->getActiveSheet()->getStyle('E1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_WHITE);
$objPHPExcel->getActiveSheet()->getStyle('D13')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->getStyle('E13')->getFont()->setBold(true);
```

## 背景填充

```
$objPHPExcel->getActiveSheet()->getStyle( 'A3:E3')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
$objPHPExcel->getActiveSheet()->getStyle( 'A4:E4')->getFill()->getStartColor()->setARGB('FFC125');
```

## 设置align

```
$objPHPExcel->getActiveSheet()->getStyle('D11')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
$objPHPExcel->getActiveSheet()->getStyle('D12')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
$objPHPExcel->getActiveSheet()->getStyle('D13')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
$objPHPExcel->getActiveSheet()->getStyle('A18')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_JUSTIFY);
```

## 垂直居中

```
$objPHPExcel->getActiveSheet()->getStyle('A18')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
设置column的border
$objPHPExcel->getActiveSheet()->getStyle('A4')->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
$objPHPExcel->getActiveSheet()->getStyle('B4')->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
$objPHPExcel->getActiveSheet()->getStyle('C4')->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
$objPHPExcel->getActiveSheet()->getStyle('D4')->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
$objPHPExcel->getActiveSheet()->getStyle('E4')->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
```

## 设置border的color

```
$objPHPExcel->getActiveSheet()->getStyle('D13')->getBorders()->getLeft()->getColor()->setARGB('FF993300');
$objPHPExcel->getActiveSheet()->getStyle('D13')->getBorders()->getTop()->getColor()->setARGB('FF993300');
$objPHPExcel->getActiveSheet()->getStyle('D13')->getBorders()->getBottom()->getColor()->setARGB('FF993300');
$objPHPExcel->getActiveSheet()->getStyle('E13')->getBorders()->getTop()->getColor()->setARGB('FF993300');
$objPHPExcel->getActiveSheet()->getStyle('E13')->getBorders()->getBottom()->getColor()->setARGB('FF993300');
$objPHPExcel->getActiveSheet()->getStyle('E13')->getBorders()->getRight()->getColor()->setARGB('FF993300');
```

## 设置填充颜色

```
$objPHPExcel->getActiveSheet()->getStyle('A1')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
$objPHPExcel->getActiveSheet()->getStyle('A1')->getFill()->getStartColor()->setARGB('FF808080');
$objPHPExcel->getActiveSheet()->getStyle('B1')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
$objPHPExcel->getActiveSheet()->getStyle('B1')->getFill()->getStartColor()->setARGB('FF808080');
```

## 加图片

```php
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('Logo');
$objDrawing->setDescription('Logo');
$objDrawing->setPath('./images/officelogo.jpg');
$objDrawing->setHeight(36);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('Paid');
$objDrawing->setDescription('Paid');
$objDrawing->setPath('./images/paid.png');
$objDrawing->setCoordinates('B15');
$objDrawing->setOffsetX(110);
$objDrawing->setRotation(25);
$objDrawing->getShadow()->setVisible(true);
$objDrawing->getShadow()->setDirection(45);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
//处理中文输出问题
需要将字符串转化为UTF-8编码，才能正常输出，否则中文字符将输出为空白，如下处理：
 $str  = iconv('gb2312', 'utf-8', $str);
或者你可以写一个函数专门处理中文字符串：
function convertUTF8($str)
{
    if(empty($str)) return '';
    return  iconv('gb2312', 'utf-8', $str);
}
//从数据库输出数据处理方式
从数据库读取数据如：
$db = new Mysql($dbconfig);
$sql = "SELECT * FROM  表名";
$row = $db->GetAll($sql);  // $row 为二维数组
$count = count($row);
for ($i = 2; $i <= $count+1; $i++) {
    $objPHPExcel->getActiveSheet()->setCellValue('A' . $i, convertUTF8($row[$i-2][1]));
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $i, convertUTF8($row[$i-2][2]));
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $i, convertUTF8($row[$i-2][3]));
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $i, convertUTF8($row[$i-2][4]));
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $i, convertUTF8(date("Y-m-d", $row[$i-2][5])));
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $i, convertUTF8($row[$i-2][6]));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $i, convertUTF8($row[$i-2][7]));
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $i, convertUTF8($row[$i-2][8]));
}
```

## 设置纸张类型

```
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
```

## 设置自动筛选

```
$objPHPExcel->getActiveSheet()->setAutoFilter('A5:D'.$row_count);
```

## 设置自动换行

```
$objPHPExcel->getActiveSheet()->getStyle('B6:B'.$row_count)->getAlignment()->setWrapText(true);
```

## 设置格式化数字

```php
$objPHPExcel->getActiveSheet()->getStyle('A6:A'.$row_count)->getNumberFormat()->setFormatCode('0000000000');
```

## 下载

```php
echo date('H:i:s') . " Create new Worksheet object\n";
$objPHPExcel->createSheet();
$objWriter = PHPExcel_IOFactory::createWriter($objExcel, 'Excel5');
$objWriter-save('php://output');
```



# 案例：thinkphp导出类似准考证

```php

public function downloadExcel()
    {
        $user = User::find(6);
//        dump($user->toArray());
        $spreadsheet  = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle($user->nickname); //tab 标题

        // 样式设置
        $sheet->getDefaultRowDimension()->setRowHeight(20); //设置整体的行高
        $applyFromArray = [
            'borders' => [
                'outline' => [
                    'color' => ['argb' => '#00000'],
                ],
            ],
        ];
        $sheet->getStyle("A1:E15")->applyFromArray($applyFromArray);

        // 设置表格宽度
        $sheet->getColumnDimension('A')->setWidth(15); // 第一列
        $sheet->getColumnDimension('B')->setWidth(15);
        $sheet->getColumnDimension('C')->setWidth(15);
        $sheet->getColumnDimension('D')->setWidth(15);
        $sheet->getColumnDimension('E')->setWidth(20);
        // 设置表格高度
        $sheet->getRowDimension('1')->setRowHeight(25); // 第一行
        $sheet->getRowDimension('2')->setRowHeight(25);
        $sheet->getRowDimension('3')->setRowHeight(25);
        $sheet->getRowDimension('4')->setRowHeight(25);
        $sheet->getRowDimension('5')->setRowHeight(25);
        $sheet->getRowDimension('6')->setRowHeight(25);
        $sheet->getRowDimension('7')->setRowHeight(30);
        $sheet->getRowDimension('8')->setRowHeight(30);
        $sheet->getRowDimension('9')->setRowHeight(30);
        $sheet->getRowDimension('10')->setRowHeight(30);
        $sheet->getRowDimension('11')->setRowHeight(30);
        $sheet->getRowDimension('12')->setRowHeight(30);
        $sheet->getRowDimension('13')->setRowHeight(200);

        // 垂直居中
//        $sheet->getStyle('A')->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);

        // 水平居中
        $styleArray = [
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER, //水平居中
                'vertical' => Alignment::VERTICAL_CENTER, // 垂直居中
                'wrapText' => true, // 换行
            ],
        ];
        $sheet->getStyle("A1:A12")->applyFromArray($styleArray);
        $sheet->getStyle("B1:E6")->applyFromArray($styleArray);
        $sheet->getStyle("E1")->applyFromArray($styleArray); //头像的水平居中

        $sheet->getStyle("A1:E13")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);// 设置整提边框

        $sheet->getStyle("B7:B12")->getAlignment()->setWrapText(true); // 考试场地
        $sheet->getStyle("B8")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER); // 时间
        $sheet->getStyle("B10")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER); // 时间
        $sheet->getStyle("B12")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER); // 时间

        $sheet->getStyle("A13")->getAlignment()->setWrapText(true); //注意事项
        $sheet->getStyle("A1:E12")->getFont()->setSize("10"); //全局字体设置
        $sheet->getStyle("A13")->getFont()->setSize("10"); // 注意事项字体设置



        $sheet->setCellValue('A1', "姓 名");
        $sheet->setCellValue('B1', $user->nickname);
        $sheet->setCellValue('C1', "性 别");
        $sheet->setCellValue('D1', $user->sex == 0 ? "男": "女");

        // 头像
        // demoPath: http://orangbus.cn/public/storage/student/53012619961024201X.png
        $avatar = str_replace("\\","/", app()->getRootPath()."public/storage/student/53012619961024201X.png");
        $sheet->mergeCells('E1:E4');
        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName($user->nickname);
        $drawing->setPath($avatar); //需要一个服务器上的完成路径
        $drawing->setWidth("130"); //设置插入图片的宽度
        $drawing->setHeight("125"); //设置插入图片的高度
        $drawing->setOffsetX(3); // 图片横向偏移
        $drawing->setOffsetY(3); // 图片纵向偏移
        $drawing->setCoordinates("E1"); // 插入位置
        $drawing->setWorksheet($sheet);


        $sheet->mergeCells('B2:D2');
        $sheet->setCellValue('A2', "准考证号");
        $sheet->setCellValue('B2', $user->id);
        $sheet->mergeCells('B3:D3');
        $sheet->setCellValue('A3', "居民身份证");
        $sheet->setCellValue('B3', $user->id);
        $sheet->mergeCells('B4:D4');
        $sheet->setCellValue('A4', "所在单位");
        $sheet->setCellValue('B4', $user->nickname);

        $sheet->setCellValue('A5', "职业工种");
        $sheet->mergeCells('B5:C5');
        $sheet->setCellValue('B5', $user->nickname);
        $sheet->setCellValue('D5', "技能等级");
        $sheet->setCellValue('E5', $user->nickname);

        $sheet->setCellValue('A6', "考试科目");
        $sheet->mergeCells('B6:C6');
        $sheet->setCellValue('B6', $user->nickname);
        $sheet->setCellValue('D6', "文化程度");
        $sheet->setCellValue('E6', $user->nickname);

        $sheet->setCellValue('A7', "理论考试地点");
        $sheet->mergeCells('B7:E7');
        $sheet->setCellValue('B7', "考试前15分钟凭准考证和身份证入场，对号入座，并将证件放在桌子左上角，其他证件、证明均无效,并将证件放在桌子左上角，其他证件、证明均无效");
        $sheet->setCellValue('A8', "理论考试时间");
        $sheet->mergeCells('B8:E8');
        $sheet->setCellValue('B8', "2021-04-23 14:23:00");

        $sheet->setCellValue('A9', "理论考试地点");
        $sheet->mergeCells('B9:E9');
        $sheet->setCellValue('B9', "考试前15分钟凭准考证和身份证入场，对号入座，并将证件放在桌子左上角，其他证件、证明均无效,并将证件放在桌子左上角，其他证件、证明均无效");
        $sheet->setCellValue('A10', "理论考试时间");
        $sheet->mergeCells('B10:E10');
        $sheet->setCellValue('B10', "2021-04-23 14:23:00");

        $sheet->setCellValue('A11', "理论考试地点");
        $sheet->mergeCells('B11:E11');
        $sheet->setCellValue('B11', "考试前15分钟凭准考证和身份证入场，对号入座，并将证件放在桌子左上角，其他证件、证明均无效,并将证件放在桌子左上角，其他证件、证明均无效");
        $sheet->setCellValue('A12', "理论考试时间");
        $sheet->mergeCells('B12:E12');
        $sheet->setCellValue('B12', "2021-04-23 14:23:00");

        $sheet->mergeCells('A13:E13');
        $text = "
注意事项:
1、考试前15分钟凭准考证和身份证入场，对号入座，并将证件放在桌子左上角，其他证件、证明均无效;
2、只准带墨水笔(圆珠笔)、2B铅笔、直尺、橡皮、铅笔刀入座。与考场无关的物品，
按规定存放在考场指定位置。移动电话等通信设备，应切断电源:
3、开考30分钟内考生不得退场，开考30分 钟后迟到考生不得入场:
4、遵守考场规则，考试时不准旁窥、交谈、吸烟、传递物品、严禁作弊。交卷后不得在考场附近逗留或者谈论:
5、如遇试卷分发错误、印刷字迹模糊等问题可举手询问，不得要求监考人员解释试题:
6、考试截止时间一到，立即停止答卷，不得将试卷、答题卡和草稿纸带出考场:
7、服从考试工作人员管理、监督和检查，不得无理取闹，违者取消考试资格:
8、考试结束后可通过网上:报名系统查询成绩，请关注报名系统通知消息。

注:如果您参加机考，考试账号为准考证号，考试校验码为身份证号后4位。";
        $sheet->setCellValue('A13', $text);

        // 保存
        $writer = new Xlsx($spreadsheet);
        $writer->save($user->nickname.".xlsx");
        dd("123");

        // 下载
        $sheet->createSheet();
        $objWriter = IOFactory::createWriter($sheet, 'Excel5');
        $objWriter->save('php://output');

    }
```

