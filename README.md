# Rasterex Viewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Dependencies

Run `npm i` to install development dependencies.

## Configuration

Use rxconfig.js to setup the RxView360 server base URL.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Configure Viewer UI
The viewever makes use of the params in the configuration files to parameterize the UI and some fucntions of the viewspace. The `defaultconfig.xml` serves as the template for dynamic configuration source. It is located in the `bin` folder that is the subfolder of the installation folder (e.g. `C:\Rasterex\RxView360Server\bin\defaultconfig.xml1`).

The template configuration structure can be seen below.
<details>
  <Summary>defaultconfig.xml</Summary>
  <?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <!--<Context>testconfig</Context>-->
    <!--<Licensemode>Normal</Licensemode>-->
    <ImgSwitchFactor>2.0</ImgSwitchFactor>
    <CurrentUserName>Demo</CurrentUserName>
    <DisplayName>Demo User</DisplayName>
    <MarkupLayer>5</MarkupLayer>
    <MarkupColor>#a52a2a</MarkupColor>
    <!--<XmlUrl>http://viewserver.rasterex.com/RxBinweb/RxCSISAPI.dll?WebClientPublish</XmlUrl>-->
    <!--<XmlUrlRel>http://viewserver.rasterex.com/RxBinweb</XmlUrlRel>-->
    <!--<MarkupSaveUrl>http://viewserver.rasterex.com/RxBinweb/RxCSISAPI.dll?WebClientSaveMarkup</MarkupSaveUrl>-->
    <PrintPageURL>printcanvas.htm</PrintPageURL>
    <CanChangeLayer>True</CanChangeLayer>
	<EnableMarkupEdit>True</EnableMarkupEdit>
	<CanConsolidate>True</CanConsolidate>
    <CanChangeSignature>True</CanChangeSignature>
	<EnableFileOpen>True</EnableFileOpen>
    <Readonlymarkup>False</Readonlymarkup>
    <ReverseScale>True</ReverseScale>
    <InitialDocument></InitialDocument>
    <!--<InitialDocument><%=Request.QueryString("URL")%></InitialDocument>-->
    <RefreshMarkup>False</RefreshMarkup>
    <stamps>
		<stamp>Approved</stamp>
		<stamp>Draft</stamp>
		<stamp>Received</stamp>
		<stamp>Rejected</stamp>
		<stamp>Reviewed</stamp>
		<stamp>Revised</stamp>
    </stamps>
    <layers>
	<layer>
		<name>Layer 0</name>		
		<color>#ffffff</color>		
		<number>0</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 1</name>		
		<color>#ff0000</color>		
		<number>1</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 2</name>		
		<color>#0000ff</color>		
		<number>2</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 3</name>		
		<color>#008000</color>		
		<number>3</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 4</name>		
		<color>#ffff00</color>		
		<number>4</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 5</name>		
		<color>#a52a2a</color>		
		<number>5</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 6</name>		
		<color>#ffd700</color>		
		<number>6</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 7</name>		
		<color>#fff5ee</color>		
		<number>7</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 8</name>		
		<color>#fff8dc</color>		
		<number>8</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 9</name>		
		<color>#fffacd</color>		
		<number>9</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 10</name>		
		<color>#ffffe0</color>		
		<number>10</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 11</name>		
		<color>#98fb98</color>		
		<number>11</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 12</name>		
		<color>#afeeee</color>		
		<number>12</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 13</name>		
		<color>#e0ffff</color>		
		<number>13</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 14</name>		
		<color>#e6e6fa</color>		
		<number>14</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 15</name>		
		<color>#dda0dd</color>		
		<number>15</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 16</name>		
		<color>#d3d3d3</color>		
		<number>16</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 17</name>		
		<color>#ffc0cb</color>		
		<number>17</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 18</name>		
		<color>#ffe4c4</color>		
		<number>18</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 19</name>		
		<color>#ffe4b5</color>		
		<number>19</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 20</name>		
		<color>#f0e68c</color>		
		<number>20</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 21</name>		
		<color>#90ee90</color>		
		<number>21</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 22</name>		
		<color>#20b2aa</color>		
		<number>22</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 23</name>		
		<color>#87cefa</color>		
		<number>23</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 24</name>		
		<color>#6495ed</color>		
		<number>24</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 25</name>		
		<color>#ee82ee</color>		
		<number>25</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 26</name>		
		<color>#c0c0c0</color>		
		<number>26</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 27</name>		
		<color>#f08080</color>		
		<number>27</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 28</name>		
		<color>#f4a460</color>		
		<number>28</number>		
		<state>on</state>		
	</layer>
	<layer>
		<name>Layer 29</name>		
		<color>#000000</color>		
		<number>29</number>		
		<state>on</state>		
	</layer>

    </layers>

	<GuiConfig>
		<Default>
			<CanAnnotate>True</CanAnnotate>
			<CanConsolidate>True</CanConsolidate>
    		<CanSignature>True</CanSignature>
			<CanFileOpen>True</CanFileOpen>
			<CanCompare>True</CanCompare>
			<CanPrint>True</CanPrint>
			<CanExport>True</CanExport>
			<CanSaveFile>True</CanSaveFile>
			<CanGetFileInfo>True</CanGetFileInfo>
			<DisableViewPages>False</DisableViewPages>
			<DisableViewAnnotations>False</DisableViewAnnotations>
			<DisableViewUserLayers>False</DisableViewUserLayers>
			<DisableViewVectorLayers>False</DisableViewVectorLayers>
			<DisableView3DParts>False</DisableView3DParts>
			<DisableMarkupTextButton>False</DisableMarkupTextButton>
			<DisableMarkupCalloutButton>False</DisableMarkupCalloutButton>
			<DisableMarkupStampButton>False</DisableMarkupStampButton>
			<DisableMarkupPaintButton>False</DisableMarkupPaintButton>
			<DisableMarkupShapeButton>False</DisableMarkupShapeButton>
			<DisableMarkupArrowButton>False</DisableMarkupArrowButton>
			<DisableMarkupMeasureButton>False</DisableMarkupMeasureButton>
			<DisableMarkupCountButton>False</DisableMarkupCountButton>
			<DisableMarkupEraseButton>False</DisableMarkupEraseButton>
			<DisableMarkupNoteButton>False</DisableMarkupNoteButton>
			<DisableMarkupLockButton>False</DisableMarkupLockButton>
			<DisableMarkupUndoRedoButtons>False</DisableMarkupUndoRedoButtons>
			<DisableBottomToolbar>False</DisableBottomToolbar>
			<DisableBirdEyeButton>False</DisableBirdEyeButton>
			<DisableReset3DModelButton>False</DisableReset3DModelButton>
			<Disable3DSelectButton>False</Disable3DSelectButton>
			<Disable3DSelectMarkupButton>False</Disable3DSelectMarkupButton>
			<DisableWalkthroughButton>False</DisableWalkthroughButton>
			<DisableHide3DPartsButton>False</DisableHide3DPartsButton>
			<DisableExplode3DModelButton>False</DisableExplode3DModelButton>
			<DisableTransparency3DModelButton>False</DisableTransparency3DModelButton>
			<DisableClipping3DModelButton>False</DisableClipping3DModelButton>
			<DisableCreateViewButton>False</DisableCreateViewButton>
			<DisableMagnifyingGlassButton>False</DisableMagnifyingGlassButton>
			<DisableZoomInButton>False</DisableZoomInButton>
			<DisableZoomOutButton>False</DisableZoomOutButton>
			<DisableFitToWindowButton>False</DisableFitToWindowButton>
			<DisableFitWidthButton>False</DisableFitWidthButton>
			<DisableFitHeightButton>False</DisableFitHeightButton>
			<DisableZoomInAreaButton>False</DisableZoomInAreaButton>
			<DisableRotateButton>False</DisableRotateButton>
			<DisableHideMarkupsButton>False</DisableHideMarkupsButton>
			<DisableSelectTextButton>False</DisableSelectTextButton>
			<DisableSearchTextButton>False</DisableSearchTextButton>
			<DisableSearchAttributesButton>False</DisableSearchAttributesButton>
			<DisableBackgroundColorButton>False</DisableBackgroundColorButton>
			<DisableMonochromeButton>False</DisableMonochromeButton>
		</Default>
	</GuiConfig>

	<LogoUrlX>/assets/images/logo.svg</LogoUrlX>

	<GuiColorPaletteX>
		<accent>#FF6C22</accent>
		<background>#D6DADC</background>
		<backgroundLight>#EBEEF6</backgroundLight>
		<sideNavBackground>#8C9EF8</sideNavBackground>
		<sideNavBackgroundActive>#FFFFFF</sideNavBackgroundActive>
		<sideNavColor>#EAEAEA</sideNavColor>
		<sideNavColorActive>#8C9EF8</sideNavColorActive>
		<topNavBackground>#FFFFFF</topNavBackground>
		<topNavColor>#0F0069</topNavColor>
		<toolbarBackground>#FFFFFF</toolbarBackground>
		<toolbarColor>#0F0069</toolbarColor>
		<main>#0F0069</main>
		<light>#F0F7F9</light>
		<lightSecondary>#EDF1F2</lightSecondary>
		<secondary>#A4ABAE</secondary>
		<accentSecondary>#F0F7F9</accentSecondary>
	</GuiColorPaletteX>
</Configuration>
</details>

The parameters that are distintict from the original configuration file and which are used for the paramaterization of the viewspace as well as the customization of the UI are as follows.

### Default Config
The default config part of the paramaters is responsible for availability of the specific functions and modules of the viewspace. Allowing or disabling a funtion here will refelct its availability in the viewspace.
The parameters that do belong to the functional default config are listed below.
<details>
  <Summary>Default Config</Summary>
  <GuiConfig>
		<Default>
			<CanAnnotate>True</CanAnnotate>
			<CanConsolidate>True</CanConsolidate>
    		<CanSignature>True</CanSignature>
			<CanFileOpen>True</CanFileOpen>
			<CanCompare>True</CanCompare>
			<CanPrint>True</CanPrint>
			<CanExport>True</CanExport>
			<CanSaveFile>True</CanSaveFile>
			<CanGetFileInfo>True</CanGetFileInfo>
			<DisableViewPages>False</DisableViewPages>
			<DisableViewAnnotations>False</DisableViewAnnotations>
			<DisableViewUserLayers>False</DisableViewUserLayers>
			<DisableViewVectorLayers>False</DisableViewVectorLayers>
			<DisableView3DParts>False</DisableView3DParts>
			<DisableMarkupTextButton>False</DisableMarkupTextButton>
			<DisableMarkupCalloutButton>False</DisableMarkupCalloutButton>
			<DisableMarkupStampButton>False</DisableMarkupStampButton>
			<DisableMarkupPaintButton>False</DisableMarkupPaintButton>
			<DisableMarkupShapeButton>False</DisableMarkupShapeButton>
			<DisableMarkupArrowButton>False</DisableMarkupArrowButton>
			<DisableMarkupMeasureButton>False</DisableMarkupMeasureButton>
			<DisableMarkupCountButton>False</DisableMarkupCountButton>
			<DisableMarkupEraseButton>False</DisableMarkupEraseButton>
			<DisableMarkupNoteButton>False</DisableMarkupNoteButton>
			<DisableMarkupLockButton>False</DisableMarkupLockButton>
			<DisableMarkupUndoRedoButtons>False</DisableMarkupUndoRedoButtons>
			<DisableBottomToolbar>False</DisableBottomToolbar>
			<DisableBirdEyeButton>False</DisableBirdEyeButton>
			<DisableReset3DModelButton>False</DisableReset3DModelButton>
			<Disable3DSelectButton>False</Disable3DSelectButton>
			<Disable3DSelectMarkupButton>False</Disable3DSelectMarkupButton>
			<DisableWalkthroughButton>False</DisableWalkthroughButton>
			<DisableHide3DPartsButton>False</DisableHide3DPartsButton>
			<DisableExplode3DModelButton>False</DisableExplode3DModelButton>
			<DisableTransparency3DModelButton>False</DisableTransparency3DModelButton>
			<DisableClipping3DModelButton>False</DisableClipping3DModelButton>
			<DisableCreateViewButton>False</DisableCreateViewButton>
			<DisableMagnifyingGlassButton>False</DisableMagnifyingGlassButton>
			<DisableZoomInButton>False</DisableZoomInButton>
			<DisableZoomOutButton>False</DisableZoomOutButton>
			<DisableFitToWindowButton>False</DisableFitToWindowButton>
			<DisableFitWidthButton>False</DisableFitWidthButton>
			<DisableFitHeightButton>False</DisableFitHeightButton>
			<DisableZoomInAreaButton>False</DisableZoomInAreaButton>
			<DisableRotateButton>False</DisableRotateButton>
			<DisableHideMarkupsButton>False</DisableHideMarkupsButton>
			<DisableSelectTextButton>False</DisableSelectTextButton>
			<DisableSearchTextButton>False</DisableSearchTextButton>
			<DisableSearchAttributesButton>False</DisableSearchAttributesButton>
			<DisableBackgroundColorButton>False</DisableBackgroundColorButton>
			<DisableMonochromeButton>False</DisableMonochromeButton>
		</Default>
	</GuiConfig>
</details>

### Logo Configuration
For the ease of the branding in case the need os setting up a customer-tailored version the logo and color palette configs can be set in the `defaultconfig.xml`.

#### Logo
The image used as a logo that is used in the viewer (e.g. in the header of the viewspace) can be set with the help of the below parameter.
`<LogoUrlX>/assets/images/logo.svg</LogoUrlX>`

#### Color Palette
The color palette is defined with the help of the tags that are listed below.
`<GuiColorPaletteX>
		<accent>#FF6C22</accent>
		<background>#D6DADC</background>
		<backgroundLight>#EBEEF6</backgroundLight>
		<sideNavBackground>#8C9EF8</sideNavBackground>
		<sideNavBackgroundActive>#FFFFFF</sideNavBackgroundActive>
		<sideNavColor>#EAEAEA</sideNavColor>
		<sideNavColorActive>#8C9EF8</sideNavColorActive>
		<topNavBackground>#FFFFFF</topNavBackground>
		<topNavColor>#0F0069</topNavColor>
		<toolbarBackground>#FFFFFF</toolbarBackground>
		<toolbarColor>#0F0069</toolbarColor>
		<main>#0F0069</main>
		<light>#F0F7F9</light>
		<lightSecondary>#EDF1F2</lightSecondary>
		<secondary>#A4ABAE</secondary>
		<accentSecondary>#F0F7F9</accentSecondary>
	</GuiColorPaletteX>`
